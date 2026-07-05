import fs from 'node:fs';

export default async function handler(req, res) {
  try {
    const { reqHandler } = await import('../dist/AgroInter/server/server.mjs');
    return reqHandler(req, res);
  } catch (err) {
    let listing = '';
    try {
      const walk = (dir, depth) => {
        if (depth > 4) return '';
        let out = '';
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          out += '  '.repeat(depth) + entry.name + (entry.isDirectory() ? '/' : '') + '\n';
          if (entry.isDirectory()) out += walk(dir + '/' + entry.name, depth + 1);
        }
        return out;
      };
      listing = 'TASK ROOT (' + process.cwd() + '):\n' + walk(process.cwd(), 0);
    } catch (e2) {
      listing = 'No se pudo listar: ' + e2.message;
    }
    res.status(500).setHeader('Content-Type', 'text/plain');
    res.end('DEBUG ERROR:\n' + (err && err.stack ? err.stack : String(err)) + '\n\n' + listing);
  }
}
