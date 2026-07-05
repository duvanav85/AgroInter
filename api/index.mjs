export default async function handler(req, res) {
  try {
    const { reqHandler } = await import('../dist/AgroInter/server/server.mjs');
    return reqHandler(req, res);
  } catch (err) {
    res.status(500).setHeader('Content-Type', 'text/plain');
    res.end('DEBUG ERROR:\n' + (err && err.stack ? err.stack : String(err)));
  }
}
