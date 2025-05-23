// sw.js - Vanilla JavaScript Service Worker for Precaching Hashed Assets

// Version is just informative
const ver = "1.0.4";

// This controls resetting the cache to solve problems with past buggy Service Workers
const reset = false;

// Use a single, static cache name. Versioning is handled by the hashed filenames.
const CACHE_NAME = "wallet-static-assets";

// List of files to precache.
// Dynamically generated by the build tool.
// The paths MUST be absolute.
const MUST_BE_CACHED_ARRAY = [
{{ range .ToBeCached }}
{{- with . }}   { url: "{{.Url}}", revision: "{{.Revision}}" },{{ end }}
{{ end -}}
];

// --- Service Worker Lifecycle ---

// 1. Installation: Precache assets defined in the current PRECACHE_URLS
//
self.addEventListener("install", (event) => {
   console.log("[SW Install] Event");

   const perform_preCaching = async () => {
      // Open the cache or create it
      if (reset) {
         console.log(`[SW Install] Deleting cache: ${CACHE_NAME}`);
         await caches.delete(CACHE_NAME)
      }

      const cache = await caches.open(CACHE_NAME);
      console.log(`[SW Install] Opened cache: ${CACHE_NAME}`);

      // Get all keys (requests) currently in the cache.
      // The keys include the query '?revision=63a30637dfaf54fda8fef38245d8c90b' so we can check if we need
      // to refresh the entry.
      const cachedRequests = await cache.keys();

      // If an entry must be cached and it is not, do a fetch and cache it
      for (const entry of MUST_BE_CACHED_ARRAY) {
         // This is the 'naked' entry but with the origin.
         // Like: 'https://wallet.mycredential.eu/app-ZUVSYDJ2.js'
         const mustBeCachedHref = new URL(entry.url, self.location.origin).href;

         // The is the full url including the revision.
         // Like: 'https://wallet.mycredential.eu/app-ZUVSYDJ2.js?revision=c9c6749fa094ca85fbde5ae3206dcce6 '
         const mustBeCachedUrl = mustBeCachedHref + "?revision=" + entry.revision;

         // Check if the entry is actually cached
         const cachedRequest = cachedRequests.find((request) => request.url === mustBeCachedUrl);

         if (cachedRequest) {
            console.log(`[SW Install] Entry is already in cache: ${mustBeCachedUrl}`);
         } else {
            // The entry is not in the cache, add it to the list to be requested from the server and cached
            console.log(`[SW Install] To be cached: ${mustBeCachedUrl}`);
            const networkResponse = await fetch(mustBeCachedHref, {redirect: "follow"});
            if (!networkResponse || !networkResponse.ok) {
               console.error(`[SW Install] Failed to fetch ${mustBeCachedHref}:`, networkResponse);
               throw new Error(`Failed to fetch ${mustBeCachedUrl}`);
            }
            if (networkResponse.redirected === true) {
               console.log(`[SW Install] Response was redirected: ${mustBeCachedUrl} ---> ${networkResponse.url}`);
               continue;
            }
 
            console.log(`[SW Install] Adding entry to cache: ${mustBeCachedUrl}`);

            // Cache using the url which includes the revision as key
            cache.put(mustBeCachedUrl, networkResponse);
         }
      }

      console.log("[SW Install] All specified files have been cached.");

      self.skipWaiting();
   };

   event.waitUntil(perform_preCaching());
});

// 2. Activation: Clean up old, unused cache entries
self.addEventListener("activate", (event) => {
   console.log("[SW Activate] Event");
   const cleanUpCache = async () => {
      try {
         const cache = await caches.open(CACHE_NAME);

         // Get all keys (requests) currently in the cache.
         // The keys include the revision
         const cachedRequests = await cache.keys();

         console.log("[SW Activate] Checking for outdated cache entries...");

         // Build an array of deletion promises, by looking at each cached entry
         const deletePromises = cachedRequests.map(async (cachedRequest) => {
            // Get attributes of cached request
            const cachedUrl = new URL(cachedRequest.url);
            const cachedPathname = cachedUrl.pathname;
            const cachedRevision = cachedUrl.searchParams.get("revision");

            // Find an entry with the same base path and revision
            const matchingEntry = MUST_BE_CACHED_ARRAY.find((must_entry) => {
               if (must_entry.url === cachedPathname && must_entry.revision === cachedRevision) {
                  console.log("[SW Activate] Found matching entry:", cachedUrl.href);
                  return true;
               }
            });

            if (matchingEntry) {
               // If found, do nothing
               return;
            }
            // If not found, delete the entry
            console.log(`[SW Activate] Deleting outdated cache entry: ${cachedRequest.url}`);
            return cache.delete(cachedRequest);
         });

         // Wait for all delete promises to resolve
         await Promise.all(deletePromises);
         console.log("[SW Activate] Cache cleanup complete.");

         // Control all pages where the service worker is enabled
         await self.clients.claim();
         console.log("[SW Activate] Clients claimed. Service Worker is active and controlling pages.");
      } catch (error) {
         console.error("[SW Activate] Activation and cleanup failed:", error);
      }
   };
   event.waitUntil(cleanUpCache());
});

// 3. Fetch: Serve precached assets from cache (Cache-First Strategy)
self.addEventListener("fetch", (event) => {

   // Only handle GET requests
   if (event.request.method !== "GET") {
      return;
   }

   var requestUrlString = event.request.url;
   var requestUrl = new URL(requestUrlString);
   var requestPathname = requestUrl.pathname;
   console.log("[SW Fetch]:", requestPathname);

   if (requestPathname == "/") {
      console.log("[SWSWSWSWSWSWSWSW Fetch] Adding index.html to /");
      requestUrlString = "/index.html";
      requestUrl = new URL(requestUrlString, requestUrl.origin);
      requestPathname = requestUrl.pathname;
   }

   const requestHref = new URL(requestPathname, requestUrl.origin).href;

   // Determine if the request is for a asset tha must be cached
   // The requests do not include th erevision, so we must check at this moment the base path
   const matchingEntry = MUST_BE_CACHED_ARRAY.find((entry) => {
      if (entry.url === requestPathname) {
         console.log("[SW Fetch] Found matching entry:", entry.url, requestPathname);
         return true;
      }
   });

   // If the request should not be cached, just return and the fetch will be done automatically
   if (!matchingEntry) {
      console.log(`[SW Fetch] Request must not be cached: will fetch (network) - ${event.request.url}`);
      return;
   }

   // Apply cache-first strategy ONLY for assets that must be cached
   console.log(`[SW Fetch] fetch (precached) - ${event.request.url}`);
   event.respondWith(
      (async () => {

         const cache = await caches.open(CACHE_NAME);

         // This is the url that should be matched with the cache, which includes the revision
         const fullRequestUrl = requestHref + "?revision=" + matchingEntry.revision;

         // Check if the url including revision is in the cache, and return it if found
         const cachedResponse = await cache.match(fullRequestUrl);
         if (cachedResponse) {
            console.log(`[SW Fetch] Returning cached response for: ${event.request.url}`);
            return cachedResponse;
         }

         // Fallback: If not in cache (e.g., installation failed partially, or edge case), fetch from network.
         console.warn(
            `[SW Fetch] Precached asset not found in cache, fetching from network: ${event.request.url}`
         );

         try {
            const networkResponse = await fetch(event.request, {redirect: "follow"});
            console.log(`[SW Fetch] Adding entry to cache: ${event.request.url}`);
            cache.put(fullRequestUrl, networkResponse.clone());
            return networkResponse;

         } catch (error) {
            console.error(`[SW Fetch] Error fetching ${event.request.url}:`, error);
            // Optional: Return a fallback offline page/response
            // Example: return caches.match('/offline.html'); // Ensure offline.html is in PRECACHE_URLS
            throw error;
         }
      })()
   );
});

// Listen for messages from the client. This is just informative.
self.addEventListener("message", (event) => {
   if (event.data && event.data.type === "SKIP_WAITING") {
      console.log("[SW Fetch] Received SKIP_WAITING message. Skipping waiting...");
      self.skipWaiting();
   }
});
