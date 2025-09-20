const CACHE_NAME = "neetsaathi-cache-v1";
const urlsToCache = [
    "/",                // root
      "/index.html",      // main file
        "/manifest.json",   // PWA manifest
          "/assets/style.css",// your CSS
            "/assets/app.js",   // your JS
              "/icons/icon-192.png",
                "/icons/icon-512.png"
];

// Install event → cache files
self.addEventListener("install", (event) => {
    event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
                  return cache.addAll(urlsToCache);
          })
    );
      self.skipWaiting();
});

// Activate event → clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
          caches.keys().then((cacheNames) => {
                  return Promise.all(
                            cacheNames
                                      .filter((name) => name !== CACHE_NAME)
                                                .map((name) => caches.delete(name))
                  );
          })
    );
      self.clients.claim();
});

// Fetch event → serve from cache, then network
self.addEventListener("fetch", (event) => {
    event.respondWith(
          caches.match(event.request).then((response) => {
                  return (
                            response ||
                                    fetch(event.request).catch(() =>
                                              caches.match("/index.html") // fallback if offline
                                                      )
                  );
          })
    );
});
                  )
          })
    )
})
                  )
          })
    )
})
          })
    )
})
]