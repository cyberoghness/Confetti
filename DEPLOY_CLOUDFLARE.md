# Deploy to Cloudflare (npm)

This project is a TanStack Start SSR app. The build emits a **Cloudflare Worker
with static assets** in `dist/` — this is Cloudflare's unified Workers + Pages
runtime (the modern replacement for classic Pages Functions).

## Prerequisites

- Node.js 20+
- A Cloudflare account
- npm

## One-time setup

```bash
npm install
npx wrangler login
```

## Deploy (recommended — one command)

```bash
npm run deploy
```

This runs `vite build` and then `wrangler deploy` using the auto-generated
`dist/server/wrangler.json`. Your site goes live at
`https://tanstack-start-ts.<your-subdomain>.workers.dev`.

To change the project name, edit `"name"` in `dist/server/wrangler.json`
after build, or set it in a custom `wrangler.toml` (see below).

## Local Cloudflare preview

Test the production Worker locally before deploying:

```bash
npm run cf:preview
```

## Cloudflare Dashboard (Git-based)

If you prefer connecting a Git repo via the Cloudflare dashboard
(Workers & Pages → Create → Import a repository):

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy --config dist/server/wrangler.json`
- **Root directory:** `/`
- **Node version:** `20`

Do NOT pick "Pages (static only)" — this app needs the SSR Worker, otherwise
routes will 404 on refresh.

## Custom domain

After the first deploy: Cloudflare dashboard → Workers & Pages → your worker →
Settings → Domains & Routes → Add Custom Domain.

## Scripts reference

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Build SSR bundle into `dist/` |
| `npm run cf:preview` | Build + run Worker locally via wrangler |
| `npm run deploy` | Build + deploy to Cloudflare |
