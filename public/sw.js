const CACHE_NAME = 'wiktoria-putz-photo-v1';
const STATIC_CACHE = 'static-v1';
const IMAGE_CACHE = 'images-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/logo2.webp',
  '/favicon.ico'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FORCE_RECACHE') {
    handleForceRecache(event.data.resources);
  } else if (event.data && event.data.type === 'CLEAN_CACHE') {
    handleCacheCleanup();
  }
});

// Fetch event - cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle other requests
  event.respondWith(handleRequest(request));
});

// Image caching strategy - Cache First with Network Fallback
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network request failed, serving from cache or fallback');
    return new Response('Image not available', { status: 404 });
  }
}

// General request handler - Network First with Cache Fallback
async function handleRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

async function handleForceRecache(resources = []) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    
    // Remove old versions and fetch fresh copies
    for (const resource of resources) {
      await cache.delete(resource);
      try {
        const response = await fetch(resource, { cache: 'reload' });
        if (response.ok) {
          await cache.put(resource, response);
          console.log(`Recached: ${resource}`);
        }
      } catch (error) {
        console.warn(`Failed to recache: ${resource}`, error);
      }
    }
  } catch (error) {
    console.error('Force recache failed:', error);
  }
}

// Clean up old cache entries
async function handleCacheCleanup() {
  try {
    const imageCache = await caches.open(IMAGE_CACHE);
    const keys = await imageCache.keys();
    
    // Remove cached images older than 7 days
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    for (const request of keys) {
      const response = await imageCache.match(request);
      if (response) {
        const dateHeader = response.headers.get('date');
        if (dateHeader) {
          const cacheDate = new Date(dateHeader).getTime();
          if (cacheDate < sevenDaysAgo) {
            await imageCache.delete(request);
            console.log(`Cleaned old cache entry: ${request.url}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}