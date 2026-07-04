# Deploy on Render

Your live URL shows plain text **"Not Found"** because Render is running this as a **Static Site**, not a **Web Service**. A static site looks for `index.html` in the wrong folder and never starts the Node server.

## Fix (delete and recreate)

### Step 1 — Delete the current Static Site

1. Open [Render Dashboard](https://dashboard.render.com)
2. Click your **bollywood-bingo-fix-design** service
3. **Settings → Delete Service**

### Step 2 — Create a Web Service (not Static Site)

1. Click **New +** → **Web Service** (NOT "Static Site")
2. Connect repo: `amanhasnainy/BOLLYWOOD-BINGO-FIX-DESIGN`
3. Use these settings exactly:

| Setting | Value |
|---------|-------|
| **Name** | bollywood-bingo |
| **Runtime** | Node |
| **Build Command** | `npm ci && npm run build` |
| **Start Command** | `npm start` |
| **Publish Directory** | **leave blank** |

4. Click **Create Web Service**

### Step 3 — Verify it works

After deploy finishes (2–3 min), test:

- `https://YOUR-SERVICE.onrender.com/` → full BollyBingo website
- `https://YOUR-SERVICE.onrender.com/api/health` → `{"ok":true,...}`

If `/api/health` returns JSON, the Node server is running correctly.

## Common mistakes

| Wrong | Right |
|-------|-------|
| Static Site | **Web Service** |
| Publish directory = `dist` | **Leave empty** |
| Start command = `node dist/index.cjs` | **`npm start`** |
| No build command | **`npm ci && npm run build`** |

## Why `dist` has only 4 files

That is correct. All 99 React components are bundled into one JS file:

```
dist/public/assets/index-xxx.js   ← entire website (600 KB)
dist/index.cjs                    ← Node server
```

Run locally to confirm before deploying:

```bash
npm run build
npm start
# open http://localhost:5001
```
