// Police web, 28 oct. 2026 : voir tools/patch_app_test_sw.py.
self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('assets/fonts/MaterialIcons-Regular.otf')) {
    event.respondWith((async () => {
      try {
        const res = await fetch('assets/fonts/MaterialIcons-Regular.otf.b64');
        if (!res.ok) return fetch(event.request);
        const b64 = (await res.text()).replace(/\s/g, '');
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new Response(bytes, {headers: {'Content-Type': 'font/otf', 'Cache-Control': 'public, max-age=86400'}});
      } catch (_) {
        return fetch(event.request);
      }
    })());
  }
});
'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"favicon.png": "b50b73edac1670d2b46927fae1f03066",
"icons/Icon-maskable-512.png": "c6322ab94e57e4c41e8cf0f727a34237",
"icons/Icon-512.png": "891464b4197108e3da0d72d1257338ee",
"icons/Icon-maskable-192.png": "a46970068c8fa1360109b4c8bf5887e7",
"icons/Icon-192.png": "c3565dc79f424ad9db2d5c1b861224da",
"manifest.json": "84e8a09c44e0ff4726a97be965f646f7",
"og-image.png": "dc9feb9152578130979e9692ee629ffb",
"assets/NOTICES": "ddf0b1a1424d0ca1133e65ac5261ebd7",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/AssetManifest.bin.json": "e2cb851cf131f3cfad0d8432aaef971d",
"assets/AssetManifest.bin": "50e8421058b254365439593545f8bb85",
"assets/AssetManifest.json": "45bd97940719dec4a8c0372eb413a02d",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/fonts/MaterialIcons-Regular.otf": "f8b04480a5586351d269173a5c053618",
"assets/assets/bible.json": "da72631efad9ebe5f010f1caa1577d45",
"assets/assets/ouverture_priere.jpg": "eb396b76558e9d95c335a9a50b43319b",
"assets/assets/logo_bleu.png": "136fa47c0d90417b368870bf405f44c3",
"assets/assets/vitrine/boost-orateur.jpg": "0fa2184a9575a7d3a463afa1deac7d57",
"assets/assets/vitrine/boost-groupe.jpg": "7b5e09b6fb0c474f24df50acf4c9dacb",
"assets/assets/vitrine/boost-foule.jpg": "8730843ac358609660bafc8c9aac6f8c",
"assets/assets/vitrine/boost-priere.jpg": "51b6e4839e29ac895f54af94437c86b9",
"assets/assets/vitrine/sensibilisation-animatrice-micro.jpg": "c146601c8cac5a73a0acfee990eb4c2e",
"assets/assets/vitrine/distribution-repas-file.jpg": "017f3e9a871e6b1f367e9fe0eafd66b0",
"assets/assets/vitrine/distribution-repas-cour.jpg": "a09008bf62b2916e75130db1ffce554e",
"assets/assets/vitrine/campagne-jesus-pour-ecole-ivoirienne-grossesse.jpg": "c6d634d06c43f4ccce0cb9074134b739",
"assets/assets/vitrine/campagne-jesus-pour-ecole-ivoirienne-drogue-seringues.jpg": "beab3f3fbdc6eb4ca6ad1eef8cd097dc",
"assets/assets/vitrine/campagne-jesus-pour-ecole-ivoirienne-drogue-non.jpg": "3844d78e8978cece634fc109f5346959",
"assets/assets/cp_monogram.png": "4f76eb320e063b4777b50225db4aad69",
"assets/assets/logo.png": "06d9b83628f44a5b7f62eaa5ffe3222b",
"version.json": "83e43139af94d07ae72c62b7cab48f17",
"main.dart.js_2.part.js": "27d19173419f055a6072c1508d8345dc",
"main.dart.js_1.part.js": "646e35027f37505fe9f5f2f74d4dc97a",
"main.dart.js_3.part.js": "ffb17ad2ecbe96c7cd04ebf9cbb1db3f",
"main.dart.js": "edd510f0ac7cbed1f8a284536a4e32b6",
"index.html": "9a5071ef7f6b7cf840969193cdd2505f",
"/": "9a5071ef7f6b7cf840969193cdd2505f",
"flutter_bootstrap.js": "bd12b45ac9343bb9a6b0db5d64ca44b7",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
