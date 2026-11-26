const cachePrefix = `fibi:${self.registration.scope}:`;
const cacheName = `${cachePrefix}1`;
const assets = ['index.html', 'game.css', 'manifest.webmanifest', 'icons/fibi-192.png', 'icons/fibi-512.png']
 .map(path => new URL(path, self.registration.scope).href);
const offlinePage = assets[0];

self.addEventListener('install', event => {
 event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', event => {
 event.waitUntil((async () => {
  for (const name of await caches.keys()) {
   if (name.startsWith(cachePrefix) && name !== cacheName) await caches.delete(name);
  }
  await self.clients.claim();
 })());
});

self.addEventListener('fetch', event => {
 const { request } = event;
 if (request.method !== 'GET') return;
 const url = new URL(request.url);
 const navigation = request.mode === 'navigate' && (url.origin + url.pathname === self.registration.scope || url.origin + url.pathname === offlinePage);
 if (!navigation && !assets.includes(url.href)) return;
 const key = navigation ? offlinePage : url.href;

 event.respondWith((async () => {
  const cache = await caches.open(cacheName);
  try {
   const response = await fetch(request);
   if (response.ok) event.waitUntil(cache.put(key, response.clone()));
   return response;
  } catch {
   return (await cache.match(key)) ?? Response.error();
  }
 })());
});
