# Deploy to Cloudflare Pages (via GitHub)

This project is configured for **Cloudflare Pages** static hosting connected
to a GitHub repository.

## One-time Pages setup

1. Push this repo to GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick the repo.
3. Set the build configuration:

   | Setting              | Value                       |
   | -------------------- | --------------------------- |
   | Framework preset     | `None`                      |
   | Build command        | `npm install && npm run build` |
   | Build output directory | `dist/client`             |
   | Root directory       | *(leave blank)*             |
   | Node version         | `20` or `22` (env var `NODE_VERSION`) |

4. Click **Save and Deploy**. Every push to the default branch triggers a new
   deployment; pull requests get preview deployments automatically.

## What the build does

`npm run build` runs two steps:

1. `vite build` — bundles the client into `dist/client/` and the SSR worker
   into `dist/server/`.
2. `node scripts/prerender.mjs` — boots the SSR entry once and writes the
   home route to `dist/client/index.html`, so Cloudflare Pages can serve the
   site as fully static HTML.

Pages serves everything in `dist/client/` (HTML, hashed JS/CSS, images,
`favicon.ico`, `_headers`).

## Local preview

```bash
npm install
npm run build
npx serve dist/client      # or any static file server
```

## Notes

- No Worker / Functions are deployed — this is pure static hosting.
- The form submits directly to WhatsApp (`wa.me`), so no backend is required.
- If you later add `createServerFn` calls or `/api/*` routes, switch to the
  Workers deployment path (`npm run deploy` with Wrangler) since static Pages
  cannot execute server code.
