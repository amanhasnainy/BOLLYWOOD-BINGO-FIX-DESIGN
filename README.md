# Bollywood Bingo

Multiplayer Bollywood Bingo / Housie app with a React frontend and Express + SQLite backend.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5001`.

## Production build

```bash
npm run build
npm start
```

## Deploy

This repo is a **Node app**, not a plain static site. Pushing to GitHub alone will show **404** on GitHub Pages until you enable the workflow below.

### Option A — GitHub Pages (frontend only)

Good for the landing page. API routes (`/api/*`) will not work on Pages.

1. Push these changes to `main`.
2. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Wait for the **Deploy to GitHub Pages** workflow to finish.
4. Open `https://<your-username>.github.io/BOLLYWOOD-BINGO-FIX-DESIGN/`.

### Option B — Render (full app + API)

Good for rooms, calling numbers, and the SQLite backend.

1. Create a [Render](https://render.com) account.
2. **New → Blueprint** and connect this repo (Render reads `render.yaml`).
3. Deploy. Render runs `npm run build` then `npm start`.

### Option C — Railway / Fly.io / VPS

Use the same commands as production:

- **Build:** `npm ci && npm run build`
- **Start:** `npm start`
- **Port:** set `PORT` in the environment (the app reads `process.env.PORT`).
