const CACHE_NAME = 'wiktoria-putz-photo-v3'; // Increment version
const STATIC_CACHE = 'static-v3';
const IMAGE_CACHE = 'images-v3';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/logo2.webp',
  '/favicon.ico'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('SW: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('SW: Skip waiting');
        return self.skipWaiting();
      })
      .catch(err => console.error('SW: Install failed', err))
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('SW: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => 
            !cacheName.includes('v3') && 
            (cacheName.includes('wiktoria-putz') || cacheName.includes('static') || cacheName.includes('images'))
          )
          .map((cacheName) => {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      console.log('SW: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle image requests
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
    console.log('SW: Handling image request:', url.pathname);
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle other requests
  if (url.origin === location.origin) {
    event.respondWith(handleRequest(request));
  }
});

// Image caching with better logging
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const url = new URL(request.url);
  
  try {
    // Check cache first
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('SW: Serving from cache:', url.pathname);
      
      // Background update for freshness (don't await)
      fetch(request).then(response => {
        if (response && response.ok) {
          console.log('SW: Background updating cache:', url.pathname);
          cache.put(request, response.clone());
        }
      }).catch(() => {
        console.log('SW: Background update failed for:', url.pathname);
      });
      
      return cachedResponse;
    }
    
    // Fetch from network
    console.log('SW: Fetching from network:', url.pathname);
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.ok) {
      console.log('SW: Caching new image:', url.pathname);
      // Clone before caching
      const responseToCache = networkResponse.clone();
      
      // Cache the response (don't await to improve performance)
      cache.put(request, responseToCache).catch(err => {
        console.error('SW: Failed to cache:', url.pathname, err);
      });
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error('SW: Image request failed:', url.pathname, error);
    
    // Try cache one more time
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log('SW: Fallback to cache:', url.pathname);
      return cachedResponse;
    }
    
    // Return placeholder
    return new Response('Image not available', { 
      status: 404,
      statusText: 'Image not found'
    });
  }
}

// General request handler
async function handleRequest(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.error('SW: Request failed:', request.url, error);
    
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Cache cleanup
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    console.log('SW: Cleaning cache...');
    handleCacheCleanup();
  }
});

async function handleCacheCleanup() {
  try {
    const imageCache = await caches.open(IMAGE_CACHE);
    const requests = await imageCache.keys();
    
    console.log('SW: Current cache size:', requests.length);
    
    // Keep only the most recent 50 images (reduced for development)
    if (requests.length > 80) {
      const toDelete = requests.slice(80);
      console.log('SW: Deleting', toDelete.length, 'cached images');
      await Promise.all(toDelete.map(req => imageCache.delete(req)));
    }
  } catch (error) {
    console.error('SW: Cache cleanup failed:', error);
  }
}