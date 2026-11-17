import { handleTutorRequest } from '../../server/tutorHandler.mjs';

export default async function handler(req, res) {
  req.url = '/api/tutor/status';
  const handled = await handleTutorRequest(req, res);
  if (!handled) {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
}
