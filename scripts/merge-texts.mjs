// Re-merge Shamela line-split paragraphs in lib/book-texts.js.
// Each printed line is stored on its own line; glue body lines whose
// predecessor lacks terminal punctuation, breaking on headings ([...]),
// poetry lines (containing "...") and the 1500-char safety cap.
import fs from 'node:fs';
import path from 'node:path';

const FILE = path.join('lib', 'book-texts.js');
const src = fs.readFileSync(FILE, 'utf8');
const orig = (await import('../' + FILE.split(path.sep).join('/'))).bookTexts;

const TERM = /[.؟?!:۔…»”]\s*$/;
const HEAD = /^\s*\[[^\]]*\]\s*$/;

function mergeLines(text) {
  const out = [];
  let buf = '';
  const flush = () => { if (buf) out.push(buf); buf = ''; };
  for (const raw of text.split('\n')) {
    const t = raw.trim();
    if (!t) continue;
    if (HEAD.test(t) || t.includes('...')) { flush(); out.push(t); continue; }
    buf = buf ? buf + ' ' + t : t;
    if (TERM.test(buf) || buf.length > 1500) flush();
  }
  flush();
  return out.join('\n');
}

const header = src.split('export const bookTexts')[0].replace(/\s*$/, '');
const merged = {};
for (const k of Object.keys(orig)) merged[k] = mergeLines(orig[k]);

const body = Object.keys(merged)
  .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(merged[k])}`)
  .join(',\n');
fs.writeFileSync(FILE, `${header}\nexport const bookTexts = {\n${body}\n};\n`);

let before = 0, after = 0;
for (const k of Object.keys(orig)) { before += orig[k].split('\n').filter((x) => x.trim()).length; after += merged[k].split('\n').filter((x) => x.trim()).length; }
console.log(`merge-texts: keys=${Object.keys(merged).length} lines ${before} -> ${after}`);
