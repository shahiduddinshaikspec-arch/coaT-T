import type { DisplayPreferences, StudyProgress } from '../types';

const STORAGE_KEY = 'coa-study-sprint-v1';

export const DEFAULT_PREFERENCES: DisplayPreferences = {
  theme: 'light',
  fontScale: 'normal',
  focusView: false,
  aiTutorEnabled: false,
};

/**
 * Returns the next upcoming Thursday at 10:00 in Asia/Kolkata (+05:30),
 * formatted as "YYYY-MM-DDTHH:mm" for datetime-local editing.
 */
export function getDefaultThursdayExamIST(nowMs: number = Date.now()): string {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(nowMs + IST_OFFSET_MS);

  const dayOfWeek = istDate.getUTCDay(); // 0=Sun .. 4=Thu .. 6=Sat
  const hours = istDate.getUTCHours();
  const minutes = istDate.getUTCMinutes();

  let daysUntilThu = (4 - dayOfWeek + 7) % 7;
  // If today is already Thursday and past 10:00 AM IST, pick next Thursday
  if (daysUntilThu === 0 && (hours > 10 || (hours === 10 && minutes >= 0))) {
    daysUntilThu = 7;
  }

  const targetUtc = new Date(
    Date.UTC(
      istDate.getUTCFullYear(),
      istDate.getUTCMonth(),
      istDate.getUTCDate() + daysUntilThu,
      10,
      0,
      0
    )
  );

  const yyyy = targetUtc.getUTCFullYear();
  const mm = String(targetUtc.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(targetUtc.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T10:00`;
}

export function parseISTToEpochMs(istDateTime: string): number {
  if (!istDateTime || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(istDateTime)) {
    return Date.now();
  }
  const clean = istDateTime.slice(0, 16);
  const parsed = Date.parse(`${clean}:00+05:30`);
  return Number.isNaN(parsed) ? Date.now() : parsed;
}

export function formatExamDisplayIST(istDateTime: string): string {
  const epoch = parseISTToEpochMs(istDateTime);
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(epoch));
  } catch {
    return istDateTime.replace('T', ' ') + ' IST';
  }
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  isPast: boolean;
}

export function getCountdownParts(istDateTime: string, nowMs: number = Date.now()): CountdownParts {
  const targetMs = parseISTToEpochMs(istDateTime);
  const diff = targetMs - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalHours: 0, isPast: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days,
    hours,
    minutes,
    seconds,
    totalHours: Math.max(1, Math.round(diff / 3600000)),
    isPast: false,
  };
}

export function createDefaultProgress(): StudyProgress {
  return {
    examDateTimeIST: getDefaultThursdayExamIST(),
    completedLessons: [],
    masteredQuestions: [],
    forgotQuestions: [],
    masteredNumericals: [],
    checkedHighYield: [],
    checkedQuestions: [],
    questionDrafts: {},
    questionSelfChecks: {},
    lastActivity: null,
    preferences: { ...DEFAULT_PREFERENCES },
  };
}

export function hasSavedSession(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Partial<StudyProgress>;
    return Boolean(
      parsed.lastActivity ||
        (parsed.completedLessons && parsed.completedLessons.length > 0) ||
        (parsed.masteredQuestions && parsed.masteredQuestions.length > 0) ||
        (parsed.forgotQuestions && parsed.forgotQuestions.length > 0) ||
        (parsed.questionDrafts && Object.keys(parsed.questionDrafts).length > 0)
    );
  } catch {
    return false;
  }
}

export function loadProgress(): StudyProgress {
  const fallback = createDefaultProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<StudyProgress>;
    const prefs: Partial<DisplayPreferences> = parsed.preferences || {};
    return {
      examDateTimeIST:
        typeof parsed.examDateTimeIST === 'string' && parsed.examDateTimeIST.includes('T')
          ? parsed.examDateTimeIST
          : fallback.examDateTimeIST,
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      masteredQuestions: Array.isArray(parsed.masteredQuestions) ? parsed.masteredQuestions : [],
      forgotQuestions: Array.isArray(parsed.forgotQuestions) ? parsed.forgotQuestions : [],
      masteredNumericals: Array.isArray(parsed.masteredNumericals) ? parsed.masteredNumericals : [],
      checkedHighYield: Array.isArray(parsed.checkedHighYield) ? parsed.checkedHighYield : [],
      checkedQuestions: Array.isArray(parsed.checkedQuestions) ? parsed.checkedQuestions : [],
      questionDrafts:
        parsed.questionDrafts && typeof parsed.questionDrafts === 'object'
          ? parsed.questionDrafts
          : {},
      questionSelfChecks:
        parsed.questionSelfChecks && typeof parsed.questionSelfChecks === 'object'
          ? parsed.questionSelfChecks
          : {},
      lastActivity: parsed.lastActivity ?? null,
      preferences: {
        theme: prefs.theme === 'dark' ? 'dark' : 'light',
        fontScale:
          prefs.fontScale === 'large' || prefs.fontScale === 'xlarge'
            ? prefs.fontScale
            : 'normal',
        focusView: Boolean(prefs.focusView),
        aiTutorEnabled: Boolean(prefs.aiTutorEnabled),
      },
      updatedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : undefined,
      resetAt: typeof parsed.resetAt === 'number' ? parsed.resetAt : undefined,
    };
  } catch {
    return fallback;
  }
}

const SYNC_CODE_KEY = 'coa-study-sprint-sync-code';

export function normalizeSyncCode(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '')
    .slice(0, 48);
}

export function loadSyncCode(): string {
  try {
    return normalizeSyncCode(window.localStorage.getItem(SYNC_CODE_KEY) || '');
  } catch {
    return '';
  }
}

export function saveSyncCode(code: string): void {
  try {
    const clean = normalizeSyncCode(code);
    if (clean) {
      window.localStorage.setItem(SYNC_CODE_KEY, clean);
    } else {
      window.localStorage.removeItem(SYNC_CODE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

/**
 * Checks if the page was opened via a 1-tap auto-connect link like ?sync=shahid-coa.
 * Saves the sync code locally and removes ?sync= from the URL cleanly.
 */
export function consumeSyncCodeFromUrl(): string {
  try {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get('sync');
    if (!raw) return '';
    const clean = normalizeSyncCode(raw);
    if (clean.length >= 4) {
      saveSyncCode(clean);
      url.searchParams.delete('sync');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      return clean;
    }
    return '';
  } catch {
    return '';
  }
}

function unionArr(a: string[] | undefined, b: string[] | undefined): string[] {
  return Array.from(new Set([...(a || []), ...(b || [])]));
}

export function mergeProgressClient(local: StudyProgress, remote: StudyProgress): StudyProgress {
  const localUpdated = local.updatedAt || 0;
  const remoteUpdated = remote.updatedAt || 0;
  const localReset = local.resetAt || 0;
  const remoteReset = remote.resetAt || 0;

  if (remoteReset > localUpdated) {
    return { ...remote, preferences: local.preferences };
  }
  if (localReset > remoteUpdated) {
    return local;
  }

  const remoteNewer = remoteUpdated >= localUpdated;
  const newer = remoteNewer ? remote : local;
  const older = remoteNewer ? local : remote;

  const mergedDrafts: Record<string, string> = { ...(older.questionDrafts || {}) };
  for (const [k, v] of Object.entries(newer.questionDrafts || {})) {
    if (typeof v === 'string' && (v.trim().length > 0 || !mergedDrafts[k])) {
      mergedDrafts[k] = v;
    }
  }

  const mergedSelfChecks: Record<string, number[]> = {};
  const allCheckKeys = new Set([
    ...Object.keys(older.questionSelfChecks || {}),
    ...Object.keys(newer.questionSelfChecks || {}),
  ]);
  for (const k of allCheckKeys) {
    mergedSelfChecks[k] = Array.from(
      new Set([...(older.questionSelfChecks?.[k] || []), ...(newer.questionSelfChecks?.[k] || [])])
    ).sort((x, y) => x - y);
  }

  const newerForgot = new Set(newer.forgotQuestions || []);
  const newerMastered = new Set(newer.masteredQuestions || []);

  return {
    examDateTimeIST: newer.examDateTimeIST || local.examDateTimeIST,
    completedLessons: unionArr(local.completedLessons, remote.completedLessons),
    masteredQuestions: unionArr(local.masteredQuestions, remote.masteredQuestions).filter(
      (id) => !newerForgot.has(id)
    ),
    forgotQuestions: unionArr(local.forgotQuestions, remote.forgotQuestions).filter(
      (id) => !newerMastered.has(id)
    ),
    masteredNumericals: unionArr(local.masteredNumericals, remote.masteredNumericals),
    checkedHighYield: unionArr(local.checkedHighYield, remote.checkedHighYield),
    checkedQuestions: unionArr(local.checkedQuestions, remote.checkedQuestions),
    questionDrafts: mergedDrafts,
    questionSelfChecks: mergedSelfChecks,
    lastActivity: newer.lastActivity || older.lastActivity || null,
    // Keep each device's local comfort preferences (dark mode / font size / focus view) independent
    preferences: local.preferences,
    updatedAt: Math.max(localUpdated, remoteUpdated),
    resetAt: Math.max(localReset, remoteReset) || undefined,
  };
}

export function saveProgress(progress: StudyProgress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota / private-mode errors silently
  }
}

export function toggleInArray(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export function addUnique(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr : [...arr, item];
}

export function removeItem(arr: string[], item: string): string[] {
  return arr.filter((x) => x !== item);
}
