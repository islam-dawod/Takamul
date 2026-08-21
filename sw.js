const CACHE_NAME = 'takamul-v2';
const BASE = self.registration.scope;
const ASSETS = [
  './',
  './index.html',
  './about.html',
  './services.html',
  './contact.html',
  './portfolio.html',
  './faq.html',
  './service-web.html',
  './service-ecommerce.html',
  './service-apps.html',
  './service-marketing.html',
  './service-seo.html',
  './service-solutions.html',
  './styles.css',
  './script.js',
  './logo-takamul.png',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
