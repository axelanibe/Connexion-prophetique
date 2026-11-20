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
"flutter_bootstrap.js": "09a1d8ed56b8c1f04f0ae0bc5690ac0e",
"index.html": "4e1475129c580674e8f338ec73752d7c",
"/": "4e1475129c580674e8f338ec73752d7c",
"main.dart.js_11.part.js": "b9e647a0a7e22562c7e55dcd11b6b281",
"main.dart.js_8.part.js": "ab6bd3d2c2a5fdf6528e54d2c026c4a3",
"main.dart.js_21.part.js": "99d6fae547b0a5a8d710fd2948b7c9f9",
"main.dart.js_16.part.js": "efd19f3e088292d4a0a2becde268d391",
"main.dart.js_20.part.js": "2b894e4f5e8db4e83e9b8a6c4c2c4a83",
"main.dart.js_1.part.js": "9cd80c3f3dd49dd2a0106f0078c39d8c",
"main.dart.js_12.part.js": "1168216d285febf0fb4ee24ff641e360",
"main.dart.js_9.part.js": "d64192c0a1e39dc9874c1e04e67cd3ac",
"main.dart.js_4.part.js": "55b4d3cf5799d398e4f116f83533345c",
"main.dart.js_15.part.js": "ff6b15eab75d44758ffdef1de56ffe8b",
"main.dart.js_18.part.js": "69cc8a86b344d61a26feec1e213ea2b2",
"main.dart.js_17.part.js": "b8dbd05d3f25bcb43e8a973914a8f1a0",
"main.dart.js_2.part.js": "f3c6259bcdbd50fa6dcb5f16e5709411",
"main.dart.js_5.part.js": "14c87b92b369707c8e76ee3d2af019f5",
"main.dart.js_3.part.js": "fa59a96d445a5074b8128c119d273aec",
"main.dart.js_7.part.js": "655bf8517cb87b500cba3fd889191496",
"main.dart.js_10.part.js": "b11e75a502d14613c491f7f9dddd585e",
"main.dart.js_13.part.js": "452a55b5a6a908f7e26cbe50dffdbc92",
"main.dart.js_14.part.js": "16e60d98314669107883c69afa12170d",
"main.dart.js": "69a219294aa14b25ac7eb5c0ac80088b",
"version.json": "76fecfd99e0567973dde9c49dbbbafd9",
"assets/assets/audio/cloche-priere.wav": "4bf231c1db1e9f44542bdef5f7ace8f4",
"assets/assets/ouverture_priere.jpg": "eb396b76558e9d95c335a9a50b43319b",
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
"assets/assets/cp_monogram.png": "4f76eb320e063b4777b50225db4aad69",
"assets/assets/logo.png": "06d9b83628f44a5b7f62eaa5ffe3222b",
"assets/assets/bible.json": "cfed632f5432d3d4a847572aaae976bb",
"assets/assets/strong_hebrew.json": "7598e3c4d56a666924d2546e32c2d58d",
"assets/assets/littre/a.json": "1e8e1d23450e9c1d7ce58441cbfd7bf7",
"assets/assets/littre/c.json": "18ef5f2552122a266431eb952d3b082f",
"assets/assets/littre/b.json": "44ba729202e56da2c17be9e22ecff6b9",
"assets/assets/littre/d.json": "686df7e7a8d846de790be5e21a02e46d",
"assets/assets/littre/e.json": "dda8d3233d86f77ae6be8abfc43ab6b6",
"assets/assets/littre/h.json": "4fa05f66360c3d6cff703d2ed7cccf1b",
"assets/assets/littre/i.json": "95b6ecbacb70d16866388b012b2d76ea",
"assets/assets/littre/f.json": "0307dd9dc345e56c3d975e475351deb8",
"assets/assets/littre/j.json": "e0f85e3b96b69a6e3dcaa3de9f322381",
"assets/assets/littre/l.json": "e921bfe15deddfad6ddd1d307b7c7d0a",
"assets/assets/littre/u.json": "39698b8785eaf1feb97c6e0835da660f",
"assets/assets/littre/g.json": "11a50cdb52be7274ace40710f08fd199",
"assets/assets/littre/m.json": "9104eaf489b8e8fac415917df43412e4",
"assets/assets/littre/r.json": "9d2e21e0e5e66893e91cfc7ed5609369",
"assets/assets/littre/k.json": "f2fa8a5d8ee22a796ac6b00ae9a283d7",
"assets/assets/littre/q.json": "74701cc6c3d3bc581bd1207eed349241",
"assets/assets/littre/v.json": "2802cdfffa3ace791496085aa4fd4d60",
"assets/assets/littre/s.json": "20bc576f9defa3a918de1ee15fd389d4",
"assets/assets/littre/w.json": "a4c50ff3e359c002f8891d26756522d7",
"assets/assets/littre/t.json": "7c48deae56e3b94ac675c031e862a147",
"assets/assets/littre/x.json": "c81f4ff2803fc587791bb3d186a39305",
"assets/assets/littre/o.json": "bbb5106417d3284b14dfb69decf05a91",
"assets/assets/littre/y.json": "5fed7a78a5c019c4144725e0c6740a5f",
"assets/assets/littre/n.json": "36c82556dc08b8f5cde57b32b27067b6",
"assets/assets/littre/z.json": "7bc23944af5a7027e3139fb9d469626a",
"assets/assets/littre/oe.json": "120f3b9745b43424f4dbaca6a902e609",
"assets/assets/littre/p.json": "1944504092369a6d4d3af9ab2c4569c0",
"assets/assets/strong_greek.json": "051a3e5b8abfd6aded147fccbc84016c",
"assets/assets/logo_entete.jpg": "b71c7acf39a0920d9ea23c6aaa942039",
"assets/fonts/MaterialIcons-Regular.otf": "8b2e64480ffa29bb7aba8e6e8b3e549c",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.json": "5f6a1a516c145dd22ff4c0c1174e6022",
"assets/AssetManifest.bin": "bd1885bd1417da7b21ce411309eee83f",
"assets/AssetManifest.bin.json": "872d2730c7d6e95bdc36488e8e95ec3d",
"assets/FontManifest.json": "b740a59a6b9ace361f84e9c31f28fce9",
"assets/NOTICES": "2862c0b403e14a6967fd62b252f6034d",
"assets/packages/record_web/assets/js/record.fixwebmduration.js": "1f0108ea80c8951ba702ced40cf8cdce",
"assets/packages/record_web/assets/js/record.worklet.js": "6d247986689d283b7e45ccdf7214c2ff",
"assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w200.ttf": "d256c8178348d2afbc8a4a1ac1d7b710",
"assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w300.ttf": "789087ab696129693097122e7de0acf5",
"assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w100.ttf": "73d986a02d9e5562559262e1d6daf7a3",
"assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w500.ttf": "4de5aad377674cde06b64959f521a0bb",
"assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w600.ttf": "4c40d9c3eee6cbb3857af740dda49f8f",
"assets/packages/lucide_icons_flutter/assets/build_font/LucideVariable-w400.ttf": "43f25766dafaefdbca4cdd7031106ae3",
"assets/packages/lucide_icons_flutter/assets/lucide.ttf": "8b803b615cc5389c03c38efc433213e4",
"manifest.json": "84b2db2ea86a09a3152e2eb903298de3",
"main.dart.js_19.part.js": "047eae44b13bc9dda70b1517a7626b73",
"main.dart.js_23.part.js": "5370090a2eda97461949978ede03b71c",
"main.dart.js_22.part.js": "75f02ef9985803b4866b687e6130ab2c"};
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
