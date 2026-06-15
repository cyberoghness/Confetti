# Deploying Confetti & Co. to Cloudflare

This project is built with TanStack Start + Nitro, which produces a **Cloudflare Worker** with static assets (the modern replacement for Cloudflare Pages — fully supported on the Cloudflare network).

## Option A — Deploy the prebuilt output (fastest)

The `dist/` folder is already built and Cloudflare-ready.

```bash
npm install -g wrangler
cd dist/server
wrangler deploy
```

Wrangler will read `dist/server/wrangler.json` and publish the Worker + static assets.

## Option B — Build from source

```bash
bun install        # or: npm install
bun run build      # produces dist/
cd dist/server
wrangler deploy
```

## Option C — Cloudflare Pages (Git-based)

If you prefer the Pages dashboard:

1. Push this repo to GitHub.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command: `bun run build`
4. Build output directory: `dist/client`
5. For SSR support, use the **Workers** option instead (Option A) — Pages static-only mode will not run the SSR handler.

## Notes
- Node compat flag is already set in `wrangler.json`.
- The WhatsApp redirect and Google Form submission are fully client-side — no env vars needed.
