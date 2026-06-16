#!/usr/bin/env node
// Post-build script: render the SSR entry to a static `dist/client/index.html`
// so the site can be deployed to Cloudflare Pages (static hosting).
//
// TanStack Start outputs a Cloudflare Worker at `dist/server/index.mjs`. For
// Pages static hosting we only need the home route as `index.html` plus the
// already-built client assets in `dist/client/`.
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const clientDir = resolve(root, "dist/client");
const outFile = resolve(clientDir, "index.html");

// @lovable.dev/vite-tanstack-config may output either:
//   dist/server/index.mjs  — nitro cloudflare-module target
//   dist/server/server.js  — nitro node / cloudflare-pages target
// Try both so the script works regardless of which nitro preset is active.
const candidates = [
  resolve(root, "dist/server/index.mjs"),
  resolve(root, "dist/server/server.js"),
];
const serverEntry = candidates.find(existsSync);

if (!serverEntry) {
  console.error(
    `[prerender] Could not find a server entry. Tried:\n  ${candidates.join("\n  ")}\nRun 'vite build' first.`
  );
  process.exit(1);
}

console.log(`[prerender] Using server entry: ${serverEntry}`);

// Polyfill envs nitro/cloudflare bundle might reference.
process.env.NODE_ENV = process.env.NODE_ENV || "production";

const mod = await import(pathToFileURL(serverEntry).toString());
const handler = mod.default ?? mod;
if (!handler || typeof handler.fetch !== "function") {
  console.error("[prerender] server entry has no .fetch() export");
  process.exit(1);
}

const routes = ["/"];

await mkdir(clientDir, { recursive: true });

for (const path of routes) {
  const req = new Request(`http://localhost${path}`, { method: "GET" });
  const env = {};
  const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
  const res = await handler.fetch(req, env, ctx);
  if (!res.ok) {
    console.error(`[prerender] ${path} -> ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  const html = await res.text();
  const target = path === "/" ? outFile : resolve(clientDir, `.${path}.html`);
  await mkdir(resolve(target, ".."), { recursive: true });
  await writeFile(target, html, "utf8");
  console.log(`[prerender] wrote ${target} (${html.length} bytes)`);
}