import { handleSyncRequest } from '../server/syncHandler.mjs';

export default async function handler(req, res) {
  // Preserve query string (e.g. ?code=...) while normalizing pathname to /api/sync
  const qsIndex = (req.url || '').indexOf('?');
  const qs = qsIndex >= 0 ? req.url.slice(qsIndex) : '';
  req.url = `/api/sync${qs}`;
  const handled = await handleSyncRequest(req, res);
  if (!handled) {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
  }
}
