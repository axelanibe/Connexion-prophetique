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

const RESOURCES = {"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "5592c8fad25fde3ab44e413d024f1725",
"index.html": "4e1475129c580674e8f338ec73752d7c",
"/": "4e1475129c580674e8f338ec73752d7c",
"main.dart.js_1.part.js": "53c75719cae5aa3e2da2c9bb2e50b067",
"main.dart.js_3.part.js": "7392312174664ee7bc393d20ba6ca48b",
"main.dart.js_15.part.js": "f80cf57f9e8e2e68610605086551da7d",
"main.dart.js_11.part.js": "a80e5e9b44c35d990e5519e3a6953eaa",
"main.dart.js_8.part.js": "c37512322b55020045a40fc044f563df",
"main.dart.js_4.part.js": "09fe06d51fa0943d3fecaeeab8640503",
"main.dart.js_2.part.js": "bdf65de6b1e48fc838be7af1cc3386c5",
"main.dart.js_14.part.js": "ba3cb916b0aef107bd75fb406e38a0a9",
"main.dart.js_7.part.js": "4b7b19ece3b220f58fb6a1d18ceb6aae",
"main.dart.js_10.part.js": "5419e4f8ae4fb91a4e632e8c23212616",
"main.dart.js_9.part.js": "ab441df1e26a49bfee73a7229e8019e9",
"main.dart.js_13.part.js": "c6f808b54d6b42bc856723423a146791",
"main.dart.js_5.part.js": "71c90d59421c6c31c2acd22638e27e5e",
"main.dart.js_6.part.js": "b0f95b9f275e8225df0233cad9a681f9",
"main.dart.js": "bced98d18e46cfd78d247291561ad74f",
"version.json": "83e43139af94d07ae72c62b7cab48f17",
"assets/assets/logo.png": "06d9b83628f44a5b7f62eaa5ffe3222b",
"assets/assets/cp_monogram.png": "4f76eb320e063b4777b50225db4aad69",
"assets/assets/ouverture_priere.jpg": "eb396b76558e9d95c335a9a50b43319b",
"assets/assets/audio/cloche-priere.wav": "4bf231c1db1e9f44542bdef5f7ace8f4",
"assets/assets/vitrine/campagne-jesus-pour-ecole-ivoirienne-drogue-non.jpg": "e0ffe13fdfd1b870f7e482bd1c09a75b",
"assets/assets/vitrine/campagne-jesus-pour-ecole-ivoirienne-drogue-seringues.jpg": "02f085968c526c8363970d6d572aefcf",
"assets/assets/vitrine/campagne-jesus-pour-ecole-ivoirienne-grossesse.jpg": "07571f99427726def38fe0c7a6feed41",
"assets/assets/vitrine/distribution-repas-cour.jpg": "75a1191e70f85f0259ab4c7a388ac5fe",
"assets/assets/vitrine/distribution-repas-file.jpg": "393e247800bd8ca4599a5248281b955e",
"assets/assets/vitrine/sensibilisation-animatrice-micro.jpg": "f51593c090209a1acad735ec48aabae3",
"assets/assets/vitrine/boost-priere.jpg": "cd21c649b7950862b01ddf996bac87fc",
"assets/assets/vitrine/boost-foule.jpg": "4c55e4a7d13a00ecc615fc66e8d1378c",
"assets/assets/vitrine/boost-groupe.jpg": "1cb8c87bf5c1075953e51ea563cd2a43",
"assets/assets/vitrine/boost-orateur.jpg": "82cb2d2990e1c1299f9e4b6ad4922298",
"assets/assets/logo_bleu.png": "136fa47c0d90417b368870bf405f44c3",
"assets/assets/littre/a.json": "1e8e1d23450e9c1d7ce58441cbfd7bf7",
"assets/assets/littre/b.json": "44ba729202e56da2c17be9e22ecff6b9",
"assets/assets/littre/c.json": "18ef5f2552122a266431eb952d3b082f",
"assets/assets/littre/d.json": "686df7e7a8d846de790be5e21a02e46d",
"assets/assets/littre/e.json": "dda8d3233d86f77ae6be8abfc43ab6b6",
"assets/assets/littre/f.json": "0307dd9dc345e56c3d975e475351deb8",
"assets/assets/littre/g.json": "11a50cdb52be7274ace40710f08fd199",
"assets/assets/littre/h.json": "4fa05f66360c3d6cff703d2ed7cccf1b",
"assets/assets/littre/i.json": "95b6ecbacb70d16866388b012b2d76ea",
"assets/assets/littre/j.json": "e0f85e3b96b69a6e3dcaa3de9f322381",
"assets/assets/littre/k.json": "f2fa8a5d8ee22a796ac6b00ae9a283d7",
"assets/assets/littre/l.json": "e921bfe15deddfad6ddd1d307b7c7d0a",
"assets/assets/littre/m.json": "9104eaf489b8e8fac415917df43412e4",
"assets/assets/littre/n.json": "36c82556dc08b8f5cde57b32b27067b6",
"assets/assets/littre/o.json": "bbb5106417d3284b14dfb69decf05a91",
"assets/assets/littre/oe.json": "120f3b9745b43424f4dbaca6a902e609",
"assets/assets/littre/p.json": "1944504092369a6d4d3af9ab2c4569c0",
"assets/assets/littre/q.json": "74701cc6c3d3bc581bd1207eed349241",
"assets/assets/littre/r.json": "9d2e21e0e5e66893e91cfc7ed5609369",
"assets/assets/littre/s.json": "20bc576f9defa3a918de1ee15fd389d4",
"assets/assets/littre/t.json": "7c48deae56e3b94ac675c031e862a147",
"assets/assets/littre/u.json": "39698b8785eaf1feb97c6e0835da660f",
"assets/assets/littre/w.json": "a4c50ff3e359c002f8891d26756522d7",
"assets/assets/littre/x.json": "c81f4ff2803fc587791bb3d186a39305",
"assets/assets/littre/y.json": "5fed7a78a5c019c4144725e0c6740a5f",
"assets/assets/littre/z.json": "7bc23944af5a7027e3139fb9d469626a",
"assets/assets/littre/v.json": "2802cdfffa3ace791496085aa4fd4d60",
"assets/assets/bible.json": "cfed632f5432d3d4a847572aaae976bb",
"assets/assets/strong_hebrew.json": "7598e3c4d56a666924d2546e32c2d58d",
"assets/assets/strong_greek.json": "051a3e5b8abfd6aded147fccbc84016c",
"assets/fonts/MaterialIcons-Regular.otf": "1eeeafd7b81db8ad389c48e67ff3411a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.json": "83ae406a7e64dcd9d994fafe2a17c8b2",
"assets/AssetManifest.bin": "ecc6bf57f73e7fa872fbb7805d465738",
"assets/AssetManifest.bin.json": "a338cfbd3459a3a223924111c9680411",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/NOTICES": "3218d0a56d5f85a8658fe917ab22e9b1",
"manifest.json": "84b2db2ea86a09a3152e2eb903298de3"};
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
