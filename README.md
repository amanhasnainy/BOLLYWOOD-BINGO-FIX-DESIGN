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

### Option B — Render (full app + API) — recommended

Good for rooms, calling numbers, and the SQLite backend.

**Use a Web Service, not a Static Site.**

| Setting | Value |
|---------|-------|
| **Service type** | Web Service |
| **Build command** | `npm ci && npm run build` |
| **Start command** | `npm start` |
| **Publish directory** | **Leave empty** (do not set to `dist`) |

Why `dist` breaks: the build outputs `dist/index.cjs` (server) and `dist/public/index.html` (client). Setting publish directory to `dist` looks for `index.html` in the wrong folder and shows **Not Found**.

After deploy, open your Render URL (e.g. `https://bollywood-bingo.onrender.com`). All React components are bundled into one JS file during build — nothing is missing from the bundle.

**Manual setup in Render dashboard:**

1. **New → Web Service** → connect this repo
2. Runtime: **Node**
3. Build: `npm ci && npm run build`
4. Start: `npm start`
5. **Do not** fill in "Publish Directory"
6. Deploy

Or use **New → Blueprint** — Render reads `render.yaml` automatically.

### Option C — Railway / Fly.io / VPS

Use the same commands as production:

- **Build:** `npm ci && npm run build`
- **Start:** `npm start`
- **Port:** set `PORT` in the environment (the app reads `process.env.PORT`).
