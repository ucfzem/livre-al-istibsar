const CACHE = 'istibsar-cache-v1.0.0';
const PRECACHE = [
  "./",
  "./index.html",
  "./.nojekyll",
  "./404/index.html",
  "./404.html",
  "./_next/static/7BVCVa8xqp1IrGo7SaJ2h/_buildManifest.js",
  "./_next/static/7BVCVa8xqp1IrGo7SaJ2h/_ssgManifest.js",
  "./_next/static/chunks/176-190ee692847d7524.js",
  "./_next/static/chunks/332-a082f973cca96dd7.js",
  "./_next/static/chunks/472-3a87bb641b23ab08.js",
  "./_next/static/chunks/app/[...slug]/page-d8bf2bce41c5c60c.js",
  "./_next/static/chunks/app/_not-found-8f8aa05f0ee91c31.js",
  "./_next/static/chunks/app/layout-a77f1455a47d925b.js",
  "./_next/static/chunks/app/page-1459a76bbaee6277.js",
  "./_next/static/chunks/fd9d1056-13be25f33dc515c4.js",
  "./_next/static/chunks/framework-8883d1e9be70c3da.js",
  "./_next/static/chunks/main-044558b16442fead.js",
  "./_next/static/chunks/main-app-a3b62c4374f471ba.js",
  "./_next/static/chunks/pages/_app-1534f180665c857f.js",
  "./_next/static/chunks/pages/_error-b646007f40c4f0a8.js",
  "./_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
  "./_next/static/chunks/webpack-53d8a2b3f2cb1c0d.js",
  "./_next/static/css/210a630dc033c67f.css",
  "./_next/static/media/01f0c602c274ea55-s.p.woff2",
  "./_next/static/media/350b852752f8489d-s.p.woff2",
  "./_next/static/media/5aae3a1c1074c5e1-s.p.woff2",
  "./_next/static/media/5ec84f17416dda4d-s.woff2",
  "./_next/static/media/8c2fd50d66d22a18-s.p.woff2",
  "./_next/static/media/9c79641216ce8622-s.woff2",
  "./_next/static/media/da6e5417d357d163-s.p.woff2",
  "./_next/static/media/dd5f2241e050216b-s.p.woff2",
  "./_next/static/media/ecb0c194634e5a7f-s.woff2",
  "./index.txt",
  "./part1/1-1/index.html",
  "./part1/1-1/index.txt",
  "./part1/1-2/index.html",
  "./part1/1-2/index.txt",
  "./part1/1-3/index.html",
  "./part1/1-3/index.txt",
  "./part1/1-4/index.html",
  "./part1/1-4/index.txt",
  "./part1/1-5/index.html",
  "./part1/1-5/index.txt",
  "./part2/2-1/index.html",
  "./part2/2-1/index.txt",
  "./part2/2-2/index.html",
  "./part2/2-2/index.txt",
  "./part2/2-3/index.html",
  "./part2/2-3/index.txt",
  "./part2/2-4/index.html",
  "./part2/2-4/index.txt",
  "./part3/3-1/index.html",
  "./part3/3-1/index.txt",
  "./part3/3-2/index.html",
  "./part3/3-2/index.txt",
  "./part4/4-1/index.html",
  "./part4/4-1/index.txt",
  "./part4/4-2/index.html",
  "./part4/4-2/index.txt",
  "./part4/4-3/index.html",
  "./part4/4-3/index.txt",
  "./part5/5-1/index.html",
  "./part5/5-1/index.txt"
];

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
