// Service Worker for accessing the Cache API to store HTTP responses from the weather API
const CACHE_NAME = "weather-api-cache-v1";
const WEATHER_API_URL_PATTERN = /\/weatherapi/i; // Adjust this regex to match your weather API endpoint

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Only cache GET requests to the weather API
  if (request.method === "GET" && WEATHER_API_URL_PATTERN.test(request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          console.log("[Service Worker] Cache hit for:", request.url);
          return cachedResponse;
        }
        // Not in cache, fetch from network
        try {
          console.log(
            "[Service Worker] Cache miss, fetching from network:",
            request.url
          );
          const networkResponse = await fetch(request);
          // Only cache successful responses
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          // Optionally, return a fallback response here
          return new Response("Network error", { status: 408 });
        }
      })
    );
  }
});

// Optional: Clean up old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
  );
});
