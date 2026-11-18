// Server-side automatic cloud progress sync handler.
// Uses Vercel Private Blob Storage (@vercel/blob) on Vercel, and falls back to
// a gitignored local folder (.local-sync/) during local development when no Blob token is present.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { get as blobGet, put as blobPut } from '@vercel/blob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localSyncDir = path.resolve(__dirname, '..', '.local-sync');

const MAX_BODY_BYTES = 64 * 1024; // 64 KB cap

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.end(JSON.stringify(payload));
}

function normalizeSyncCode(raw) {
  if (typeof raw !== 'string') return '';
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '');
  if (cleaned.length < 4 || cleaned.length > 48) return '';
  return cleaned;
}

function hashSyncCode(code) {
  return crypto.createHash('sha256').update(`coa-study-sprint:${code}`).digest('hex').slice(0, 32);
}

function useVercelBlob() {
  return Boolean(
    (process.env.BLOB_READ_WRITE_TOKEN || '').trim() ||
      (process.env.BLOB_STORE_ID || '').trim() ||
      process.env.VERCEL === '1'
  );
}

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(req.body ? JSON.parse(req.body) : {});
    } catch {
      return Promise.reject(new Error('INVALID_JSON'));
    }
  }
  return new Promise((resolve, reject) => {
    let total = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        reject(new Error('PAYLOAD_TOO_LARGE'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('INVALID_JSON'));
      }
    });
    req.on('error', () => reject(new Error('READ_ERROR')));
  });
}

async function readRecord(hash) {
  const pathname = `sync/${hash}.json`;

  if (useVercelBlob()) {
    try {
      const result = await blobGet(pathname, { access: 'private', useCache: false });
      if (!result || result.statusCode !== 200 || !result.stream) return null;
      const text = await new Response(result.stream).text();
      return JSON.parse(text);
    } catch (err) {
      if (err?.name === 'BlobNotFoundError') return null;
      throw err;
    }
  }

  // Local dev fallback
  const filePath = path.join(localSyncDir, `${hash}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

async function writeRecord(hash, record) {
  const pathname = `sync/${hash}.json`;
  const serialized = JSON.stringify(record);

  if (useVercelBlob()) {
    await blobPut(pathname, serialized, {
      access: 'private',
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: 'application/json',
    });
    return;
  }

  fs.mkdirSync(localSyncDir, { recursive: true });
  fs.writeFileSync(path.join(localSyncDir, `${hash}.json`), serialized, 'utf8');
}

function unionStrings(a, b) {
  const set = new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])]);
  return Array.from(set);
}

/**
 * Conflict-free merge so Phone and PC never wipe each other's study work.
 * If one side has a newer resetAt than the other's updatedAt, the reset wins cleanly.
 */
function mergeProgressServer(existing, incoming) {
  if (!existing) return incoming;
  if (!incoming) return existing;

  const exUpdated = Number(existing.updatedAt || 0);
  const inUpdated = Number(incoming.updatedAt || 0);
  const exReset = Number(existing.resetAt || 0);
  const inReset = Number(incoming.resetAt || 0);

  if (inReset > exUpdated) {
    return { ...incoming, updatedAt: Math.max(inUpdated, inReset) };
  }
  if (exReset > inUpdated) {
    return { ...existing, updatedAt: Math.max(exUpdated, exReset) };
  }

  const incomingNewer = inUpdated >= exUpdated;
  const newer = incomingNewer ? incoming : existing;
  const older = incomingNewer ? existing : incoming;

  // Merge drafts: keep non-empty drafts from both; newer wins if both non-empty
  const mergedDrafts = { ...(older.questionDrafts || {}) };
  for (const [k, v] of Object.entries(newer.questionDrafts || {})) {
    if (typeof v === 'string' && (v.trim().length > 0 || !mergedDrafts[k])) {
      mergedDrafts[k] = v;
    }
  }

  // Merge self-check indices per question: union
  const mergedSelfChecks = {};
  const allCheckKeys = new Set([
    ...Object.keys(older.questionSelfChecks || {}),
    ...Object.keys(newer.questionSelfChecks || {}),
  ]);
  for (const k of allCheckKeys) {
    const set = new Set([
      ...(Array.isArray(older.questionSelfChecks?.[k]) ? older.questionSelfChecks[k] : []),
      ...(Array.isArray(newer.questionSelfChecks?.[k]) ? newer.questionSelfChecks[k] : []),
    ]);
    mergedSelfChecks[k] = Array.from(set).sort((x, y) => x - y);
  }

  // Mastered vs Forgot: union mastered, then let newer side's explicit forgot/mastered choices break conflicts
  const newerForgotSet = new Set(Array.isArray(newer.forgotQuestions) ? newer.forgotQuestions : []);
  const newerMasteredSet = new Set(
    Array.isArray(newer.masteredQuestions) ? newer.masteredQuestions : []
  );

  const mergedMastered = unionStrings(older.masteredQuestions, newer.masteredQuestions).filter(
    (id) => !newerForgotSet.has(id)
  );
  const mergedForgot = unionStrings(older.forgotQuestions, newer.forgotQuestions).filter(
    (id) => !newerMasteredSet.has(id)
  );

  return {
    examDateTimeIST: newer.examDateTimeIST || older.examDateTimeIST,
    completedLessons: unionStrings(older.completedLessons, newer.completedLessons),
    masteredQuestions: mergedMastered,
    forgotQuestions: mergedForgot,
    masteredNumericals: unionStrings(older.masteredNumericals, newer.masteredNumericals),
    checkedHighYield: unionStrings(older.checkedHighYield, newer.checkedHighYield),
    checkedQuestions: unionStrings(older.checkedQuestions, newer.checkedQuestions),
    questionDrafts: mergedDrafts,
    questionSelfChecks: mergedSelfChecks,
    lastActivity: newer.lastActivity || older.lastActivity || null,
    preferences: newer.preferences || older.preferences,
    updatedAt: Math.max(exUpdated, inUpdated, Date.now()),
    resetAt: Math.max(exReset, inReset) || undefined,
  };
}

export async function handleSyncRequest(req, res) {
  const fullUrl = new URL(req.url || '/api/sync', 'http://localhost');
  if (fullUrl.pathname !== '/api/sync') return false;

  // GET /api/sync?code=...
  if (req.method === 'GET') {
    const code = normalizeSyncCode(fullUrl.searchParams.get('code') || '');
    if (!code) {
      sendJson(res, 400, {
        ok: false,
        error: 'Sync code must be 4–48 letters, numbers, hyphens, or underscores.',
      });
      return true;
    }

    try {
      const hash = hashSyncCode(code);
      const record = await readRecord(hash);
      sendJson(res, 200, {
        ok: true,
        found: Boolean(record),
        updatedAt: record?.updatedAt ?? null,
        progress: record?.progress ?? null,
      });
    } catch {
      sendJson(res, 502, {
        ok: false,
        error: 'Cloud sync storage is temporarily unavailable. Your local progress is safe.',
      });
    }
    return true;
  }

  // POST /api/sync  { code, progress }
  if (req.method === 'POST') {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (err) {
      const code = err?.message === 'PAYLOAD_TOO_LARGE' ? 413 : 400;
      sendJson(res, code, { ok: false, error: 'Invalid sync payload.' });
      return true;
    }

    const code = normalizeSyncCode(body.code || '');
    if (!code || !body.progress || typeof body.progress !== 'object') {
      sendJson(res, 400, {
        ok: false,
        error: 'Valid sync code (4–48 characters) and progress data are required.',
      });
      return true;
    }

    try {
      const hash = hashSyncCode(code);
      const existingRecord = await readRecord(hash);
      const merged = mergeProgressServer(existingRecord?.progress || null, body.progress);
      const updatedAt = Number(merged.updatedAt || Date.now());
      await writeRecord(hash, { updatedAt, progress: merged });

      sendJson(res, 200, {
        ok: true,
        updatedAt,
        progress: merged,
      });
    } catch {
      sendJson(res, 502, {
        ok: false,
        error: 'Could not save to cloud sync right now. Your progress is still saved locally.',
      });
    }
    return true;
  }

  sendJson(res, 405, { ok: false, error: 'Method not allowed' });
  return true;
}
