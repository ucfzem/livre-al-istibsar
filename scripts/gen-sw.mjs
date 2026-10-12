import fs from 'node:fs';
import path from 'node:path';

const OUT = 'out';
const REPO = 'livre-al-istibsar';

if (!fs.existsSync(path.join(OUT, 'index.html'))) {
  console.error('gen-sw: out/index.html not found — run `next build` first.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');
const base = indexHtml.includes(`/${REPO}/_next/`) ? `/${REPO}` : '';

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const all = walk(OUT);
const rel = all
  .map((f) => f.slice(OUT.length).replace(/^[/\\]/, '').split(path.sep).join('/'))
  .filter((f) => f !== 'sw.js');

const precache = [...new Set(['./', './index.html', ...rel.map((f) => './' + f)])];

const sw = `const CACHE = 'istibsar-cache-v1.0.0';
const PRECACHE = ${JSON.stringify(precache, null, 2)};

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(PRECACHE.map((u) => cache.add(u).catch(() => {})));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((res) => {
        caches.open(CACHE).then((c) => c.put(req, res.clone()));
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./index.html')).then((r) => r || caches.match('./')))
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
          return res;
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) caches.open(CACHE).then((c) => c.put(req, res.clone()));
        return res;
      }).catch(() => cached);
    })
  );
});
`;
fs.writeFileSync(path.join(OUT, 'sw.js'), sw);

const MARK = 'data-sw-reg="1"';
let injected = 0;
for (const f of all) {
  if (!f.endsWith('.html')) continue;
  let h = fs.readFileSync(f, 'utf8');
  if (h.includes(MARK)) continue;
  const tag = `<script ${MARK}>if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('${base}/sw.js',{scope:'${base}/'}).catch(function(){})})}</script>`;
  if (/<\/body>/i.test(h)) h = h.replace(/<\/body>/i, tag + '\n</body>');
  else h += '\n' + tag;
  fs.writeFileSync(f, h);
  injected++;
}

console.log(`gen-sw: base="${base}" files=${rel.length} precache=${precache.length} html-injected=${injected}`);
