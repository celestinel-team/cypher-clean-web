# Download Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Log every click of the "Got it, download" button on the Cypher Clean marketing site to Vercel Postgres so the founder can see total downloads and timestamps in Vercel's database dashboard.

**Architecture:** A Vercel serverless function at `/api/track-download.js` performs a single `INSERT` into a `downloads` table on Vercel Postgres. The frontend `DownloadModal` component fires a non-awaited `fetch` to this endpoint immediately before triggering the actual GitHub release download. Tracking is fire-and-forget — failures are silently swallowed so they can never block the download.

**Tech Stack:** Vite 8 + React 19 (existing), Vercel Serverless Functions (new), Vercel Postgres via `@vercel/postgres` driver (new), Vercel CLI for local dev (new dev dependency, optional).

**Reference spec:** [docs/superpowers/specs/2026-05-21-download-tracking-design.md](../specs/2026-05-21-download-tracking-design.md)

---

## File Structure

| File | Purpose |
|---|---|
| `api/track-download.js` | NEW. The serverless function. Accepts POST, runs one INSERT, returns 200. ~15 lines. |
| `src/components/DownloadModal.jsx` | MODIFY. Add a fire-and-forget `fetch` call inside `startDownload()`. |
| `package.json` | MODIFY. Add `@vercel/postgres` to `dependencies`. |
| `.gitignore` | MODIFY (only if needed). Ensure `.env.local` and `.vercel/` are ignored. |
| Vercel dashboard | ONE-TIME setup outside this repo: create Postgres DB, link to project, run `CREATE TABLE`. |

---

## Pre-flight: Vercel dashboard setup (one-time, manual)

These steps happen in the Vercel web UI, not in code. They must be done **before** Task 3 (local dev verification) because the function reads `POSTGRES_URL` from env vars.

- [ ] **Step 1: Confirm the site is already deployed to Vercel**

Open https://vercel.com → log in → confirm a project exists for this repo. (It must — the user already has `@vercel/analytics` wired up.)

- [ ] **Step 2: Create the Postgres database**

In the Vercel dashboard for this project: click the **Storage** tab → **Create Database** → choose **Postgres** → pick the closest region → confirm. The free Hobby tier is selected by default.

- [ ] **Step 3: Link the database to the project**

After creation, Vercel prompts to connect the DB to a project. Connect it to the cypher-clean-web project for the **Production, Preview, and Development** environments. This auto-injects environment variables (`POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, etc.) into all three environments.

- [ ] **Step 4: Create the `downloads` table**

In the Postgres dashboard for the new DB, open the **Query** / **Browse** tab (the built-in SQL editor) and run:

```sql
CREATE TABLE downloads (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Expected: "CREATE TABLE" success message. Verify by running `SELECT * FROM downloads;` — expect "0 rows".

---

## Task 1: Add the `@vercel/postgres` dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

Run from the project root:

```bash
npm install @vercel/postgres
```

Expected output: a single package added, no peer-dependency warnings. `package-lock.json` updates.

- [ ] **Step 2: Verify the entry in package.json**

Open [package.json](../../../package.json) and confirm `@vercel/postgres` now appears under `dependencies` (NOT `devDependencies` — it's used at runtime by the serverless function).

- [ ] **Step 3: Verify the build still passes**

Run:

```bash
npm run build
```

Expected: build completes with no errors. (The new package isn't imported anywhere yet, so this just confirms we didn't break anything.)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add @vercel/postgres dependency for download tracking"
```

---

## Task 2: Create the serverless function

**Files:**
- Create: `api/track-download.js`

> **Note on file location:** Vercel auto-discovers files under `/api/*` at the project root (not under `src/`) and serves each as a serverless function. The path is not configurable.

- [ ] **Step 1: Create the `api/` directory**

Run from project root:

```bash
mkdir -p api
```

(On Windows PowerShell, this works too — `mkdir` is aliased to `New-Item -ItemType Directory`.)

- [ ] **Step 2: Create `api/track-download.js` with the function code**

Create the file with exactly this content:

```js
import { sql } from '@vercel/postgres'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await sql`INSERT INTO downloads DEFAULT VALUES`
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('track-download failed:', err)
    return res.status(500).json({ ok: false })
  }
}
```

Notes for the engineer:
- `sql` is a tagged template — backticks, not parentheses. It auto-parameterizes inputs (no SQL injection risk).
- The `default async function handler(req, res)` signature is Vercel's standard Node.js serverless function shape.
- We do NOT read the request body, headers, or cookies. The request is a bare ping.
- The `console.error` lands in Vercel's function logs (Dashboard → Project → Logs). Useful for debugging.

- [ ] **Step 3: Verify the build still passes**

Run:

```bash
npm run build
```

Expected: build completes. (Vite ignores `api/` since it's outside `src/`; Vercel handles it during deploy.)

- [ ] **Step 4: Commit**

```bash
git add api/track-download.js
git commit -m "feat: add /api/track-download serverless function"
```

---

## Task 3: Wire the frontend to call the function

**Files:**
- Modify: `src/components/DownloadModal.jsx` (function `startDownload`, currently at line 20)

- [ ] **Step 1: Modify `startDownload` in DownloadModal.jsx**

Open [src/components/DownloadModal.jsx](../../../src/components/DownloadModal.jsx).

Find the current function (around line 20):

```js
const startDownload = () => {
  const a = document.createElement('a')
  a.href = INSTALLER_URL
  a.rel = 'noopener noreferrer'
  document.body.appendChild(a)
  a.click()
  a.remove()
  onClose()
}
```

Replace it with:

```js
const startDownload = () => {
  // Fire-and-forget: log the download without blocking. keepalive lets the
  // request survive page navigation; .catch swallows failures so a flaky
  // tracking endpoint can never break the actual download.
  fetch('/api/track-download', { method: 'POST', keepalive: true }).catch(() => {})

  const a = document.createElement('a')
  a.href = INSTALLER_URL
  a.rel = 'noopener noreferrer'
  document.body.appendChild(a)
  a.click()
  a.remove()
  onClose()
}
```

Notes:
- The `fetch` is intentionally not `await`ed. The next line runs immediately.
- `keepalive: true` is critical — without it, navigating away (which the `<a>` click effectively does for downloads) can cancel the request mid-flight.
- The `.catch(() => {})` prevents an "Uncaught (in promise)" warning if the network call fails.
- The comment is one of the rare cases comments are warranted (per CLAUDE.md guidance): it explains the *why* of `keepalive` and `.catch`, which is non-obvious from the code.

- [ ] **Step 2: Verify the build still passes**

Run:

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 3: Verify dev server still works**

Run:

```bash
npm run dev
```

Open http://localhost:5173, click "Download for Windows" → click "Got it, download". In DevTools → Network tab, you'll see:
- `POST /api/track-download` → returns 404 (expected — `npm run dev` doesn't serve `/api/*`, only `vercel dev` does).
- The actual GitHub download starts normally.

This 404 in dev is expected and harmless. The fetch fails, `.catch` swallows it, and the download still works. We'll do a real end-to-end test with `vercel dev` in Task 4.

Stop the dev server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/components/DownloadModal.jsx
git commit -m "feat: log download clicks to /api/track-download"
```

---

## Task 4: Local end-to-end verification with `vercel dev`

**Files:** None modified. This task is verification only.

> **Goal:** Confirm the function actually writes a row to the production Postgres DB when called from a locally-running version of the site.

- [ ] **Step 1: Install Vercel CLI (if not already installed)**

Check if installed:

```bash
vercel --version
```

If not found, install globally:

```bash
npm install -g vercel
```

Expected: a version number prints (e.g., `Vercel CLI 35.x.x`).

- [ ] **Step 2: Link the local repo to the Vercel project**

Run from the project root:

```bash
vercel link
```

The CLI will prompt:
- "Set up `~/cypher-clean-web`?" → **Y**
- "Which scope?" → choose your team/personal account
- "Link to existing project?" → **Y**
- "What's the name of your existing project?" → choose the cypher-clean-web project

This creates a `.vercel/` directory locally. Verify `.vercel/` is in `.gitignore`:

```bash
cat .gitignore
```

If `.vercel` is not listed, add it:

```bash
echo ".vercel" >> .gitignore
```

- [ ] **Step 3: Pull environment variables into `.env.local`**

```bash
vercel env pull .env.local
```

Expected: `.env.local` created/updated with `POSTGRES_URL=...`, `POSTGRES_URL_NON_POOLING=...`, etc.

Verify `.env.local` is in `.gitignore` (Vite's default `.gitignore` usually includes it, but confirm):

```bash
cat .gitignore | grep -E "\.env|\.vercel"
```

Expected: both `.env*.local` (or similar) and `.vercel` are listed. If `.env.local` isn't covered, add it: `echo ".env.local" >> .gitignore`.

- [ ] **Step 4: Run with `vercel dev`**

```bash
vercel dev
```

Expected: starts on http://localhost:3000 (note: different port than `npm run dev`). Both the Vite app AND `/api/*` routes are served.

- [ ] **Step 5: Trigger a tracked download**

Open http://localhost:3000 in a browser → click "Download for Windows" → click "Got it, download".

In DevTools → Network tab, find `POST /api/track-download`:
- Status: **200**
- Response: `{"ok":true}`
- The GitHub download should also start as normal.

- [ ] **Step 6: Verify the row landed in Postgres**

In the Vercel dashboard → Storage → your Postgres DB → Query tab, run:

```sql
SELECT * FROM downloads ORDER BY created_at DESC LIMIT 5;
```

Expected: at least one row with a `created_at` matching the moment you clicked (within a few seconds, in UTC).

If no row appears, check:
1. Vercel dashboard → Project → Logs → look for `track-download failed:` errors.
2. Confirm `.env.local` contains `POSTGRES_URL`.
3. Confirm the `downloads` table exists in the connected DB (pre-flight Step 4).

- [ ] **Step 7: Stop `vercel dev`**

Ctrl+C in the terminal.

- [ ] **Step 8: No commit needed for this task** — it's verification only. If you ended up editing `.gitignore` in Step 2 or 3, commit that:

```bash
git add .gitignore
git commit -m "chore: ignore .vercel and .env.local"
```

(Skip the commit if `.gitignore` wasn't modified.)

---

## Task 5: Deploy and verify in production

**Files:** None modified. This task is deployment + verification.

- [ ] **Step 1: Push all commits to the remote**

```bash
git push
```

Vercel auto-deploys on push to `main`. Watch the deploy in the Vercel dashboard → Deployments tab.

- [ ] **Step 2: Wait for deploy to complete**

Expected: green checkmark in the dashboard. Typical deploy time: 30-60 seconds.

- [ ] **Step 3: Trigger a tracked download in production**

Open the live site (the production URL from the Vercel dashboard) in a browser → click "Download for Windows" → click "Got it, download".

In DevTools → Network tab, confirm `POST /api/track-download` returns **200**.

- [ ] **Step 4: Verify the production row landed**

Vercel dashboard → Storage → Postgres → Query:

```sql
SELECT * FROM downloads ORDER BY created_at DESC LIMIT 5;
```

Expected: a new row from the click in Step 3 is the most recent entry.

- [ ] **Step 5: Confirm useful queries work**

In the same Query editor, run each of these and confirm they return sensible results:

```sql
-- Total downloads ever
SELECT COUNT(*) FROM downloads;

-- Downloads today
SELECT COUNT(*) FROM downloads WHERE created_at > CURRENT_DATE;

-- Downloads per day, last 30 days
SELECT DATE(created_at) AS day, COUNT(*) AS downloads
FROM downloads
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY day
ORDER BY day DESC;
```

- [ ] **Step 6: Done.**

The feature is live. The founder can now check downloads anytime via Vercel dashboard → Storage → Postgres → Query.

---

## Rollback plan

If something goes wrong in production:

1. **Function is broken but downloads still work** (tracking returns 500/never): no urgent action needed. Investigate via Vercel logs. The download itself is unaffected.
2. **Function is somehow breaking the page**: extremely unlikely (it's `.catch`-wrapped fire-and-forget), but if it happens, revert the `DownloadModal.jsx` commit:
   ```bash
   git revert <commit-sha-of-task-3>
   git push
   ```
3. **DB is racking up cost** (shouldn't be possible on free tier, but): drop the table:
   ```sql
   DROP TABLE downloads;
   ```
   And the function will return 500 on every call — harmless, since failures are swallowed client-side.
