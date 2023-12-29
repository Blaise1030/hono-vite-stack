// server.ts
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises";
import api from "./api";

const isProd = process.env["NODE_ENV"] === "production";
let html = await readFile(isProd ? "build/index.html" : "index.html", "utf8");

if (!isProd) {
  // Inject Vite client code to the HTML
  html = html.replace(
    "<head>",
    `
    <script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>

    <script type="module" src="/@vite/client"></script>
    `
  );
}

const app = new Hono()
  .use("*", async (c, next) => {
    c.res.headers.set("X-Powered-By", "Hono");
    await next();
  })
  .route("/api", api) // register the API endpoint
  .use("/assets/*", serveStatic({ root: isProd ? "build/" : "./" })) // path must end with '/'
  .get("/*", (c) => c.html(html));

export default app;
export type AppType = typeof app;
