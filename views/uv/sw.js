import { values, route } from 'build:invisiproxy';
importScripts(route("/uv/uv.bundle.js"));
importScripts(route("/uv/uv.config.js"));
importScripts(self[values.uvConfigKey].sw || route("/uv/uv.sw.js"));

const uv = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      if (uv.route(event)) return await uv.fetch(event);

      return await fetch(event.request);
    })()
  );
});
