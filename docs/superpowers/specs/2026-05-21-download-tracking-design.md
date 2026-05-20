# Download Tracking — Design

**Date:** 2026-05-21
**Status:** Approved, ready for implementation planning

## Goal

Log every click of the download button on the marketing site so the founder can see total downloads and download timestamps. Must remain free at the project's current and foreseeable scale.

## Non-goals

- No user identification, IP logging, or fingerprinting.
- No bot filtering or deduplication (log everything).
- No admin UI, no scheduled email reports — viewing is done directly in Vercel's database dashboard.
- No version or referrer tracking yet (can be added later without a schema migration headache).

## Architecture

```
DownloadModal "Got it, download" click
        │
        ├─→ fire-and-forget POST /api/track-download   (NOT awaited)
        │         │
        │         ↓
        │   Vercel Serverless Function (api/track-download.js)
        │         │
        │         ↓
        │   INSERT INTO downloads DEFAULT VALUES
        │         │
        │         ↓
        │   Vercel Postgres (free tier)
        │
        └─→ <a href="...GitHub release.exe"> click   (existing behavior)
```

**Key property:** the tracking call must never block, delay, or break the actual file download. Failures in tracking are silently swallowed.

## Components

### 1. Database (Vercel Postgres)

One table, two columns:

```sql
CREATE TABLE downloads (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Created once via Vercel's dashboard SQL editor. Not managed by a migration tool — it's one statement.

### 2. Serverless function — `api/track-download.js`

Vercel auto-discovers any file under `/api/*` and serves it as a serverless function. Approximately 15 lines:

- Method check: only accept `POST`, reject everything else with 405.
- Single statement: `INSERT INTO downloads DEFAULT VALUES`.
- Returns 200 on success, 500 on DB error.
- Uses `@vercel/postgres` (`sql` tagged-template helper). Reads `POSTGRES_URL` from env vars (Vercel injects automatically when DB is linked to project).
- No request body parsing, no header reading, no cookies — the request is a bare ping.

### 3. Frontend change — `src/components/DownloadModal.jsx`

Modify `startDownload()` (currently at [DownloadModal.jsx:20](src/components/DownloadModal.jsx#L20)):

```js
const startDownload = () => {
  // Fire-and-forget. keepalive=true lets the request survive page navigation.
  // Errors are swallowed — never block the download.
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

No `await`. No user-visible delay. No error UI.

### 4. Dependencies

Add `@vercel/postgres` to `package.json`. Server-side only — it does not affect the client bundle because Vite/Vercel only bundle it into the serverless function output.

## Data flow

**Happy path:**

1. User clicks "Got it, download".
2. `fetch` to `/api/track-download` is initiated (returns a promise that's discarded).
3. `<a>` element is created and clicked → browser starts downloading the `.exe` from GitHub.
4. Modal closes.
5. Serverless function receives POST, runs `INSERT`, returns 200. Total server time ~50 ms.

**Latency added to the user experience: 0 ms** (steps 2 and 3 are non-blocking; the user never waits on the tracking call).

## Failure modes

| Scenario | User impact | Logging impact |
|---|---|---|
| Adblocker blocks `/api/track-download` | None — download works | Row lost |
| Browser offline | None — they'll try to download but it'll fail at GitHub, not at us | Row lost |
| Vercel Postgres cold-started (sleeping >5 days) | None | Row logged a few seconds late |
| Postgres genuinely down | None | Row lost (500 returned, fetch caught) |
| Double-click | None | Two rows logged. Accepted. |
| Bot/crawler POSTs to endpoint | None | Phantom row logged. Accepted (~10-20% inflation expected). |

The pattern: **DB is allowed to fail; download is not**.

## Privacy

We log **only `created_at`** (server time). No IP, no user-agent, no referrer, no cookies, no fingerprint. This stays below the GDPR/CCPA personal-data threshold, so no consent banner is required.

The product's "zero telemetry" claim refers to the desktop app itself and is unaffected by this. The marketing site already uses `@vercel/analytics`, so the privacy posture is unchanged.

## Cost analysis (Vercel free tier, as of 2026-05)

- **Postgres storage:** 256 MB free. At ~30 bytes/row, capacity is ~9 million rows.
- **Postgres compute:** 60 hours/month free. At ~10 ms per INSERT, that's ~21 million INSERTs/month.
- **Serverless invocations:** 100,000/day free. At ~50 ms/invocation.
- **Function execution:** 100 GB-hours/month free.

Net: **$0/month** unless the site sees millions of downloads/month, which would be a great problem to have.

**One gotcha:** Vercel/Neon Postgres pauses after 5 days of inactivity. The first INSERT after a cold start takes a few seconds. Because tracking is fire-and-forget, the user never notices.

## Verification plan

No test framework exists in this repo and we won't add one for ~15 lines. Manual verification instead:

**Local:**
1. `npm i -g vercel`, then `vercel link` to associate the directory with the Vercel project.
2. Create the Postgres DB in Vercel dashboard. Run the `CREATE TABLE` statement in its SQL editor.
3. `vercel env pull .env.local` to fetch `POSTGRES_URL`.
4. `vercel dev` (replaces `npm run dev`) — serves both the React app and `/api` routes.
5. Click download → check Vercel Postgres dashboard → expect one new row.

**Production:**
1. Deploy. Open the live site, click download.
2. Vercel dashboard → Storage → Postgres → Query: `SELECT * FROM downloads ORDER BY created_at DESC LIMIT 5;` → expect your click as the most recent row.
3. DevTools Network tab → `/api/track-download` returns 200, fires in parallel with (not before) the GitHub download.

## Useful queries

```sql
-- Total downloads
SELECT COUNT(*) FROM downloads;

-- Downloads today
SELECT COUNT(*) FROM downloads WHERE created_at > CURRENT_DATE;

-- Downloads per day, last 30 days
SELECT DATE(created_at) AS day, COUNT(*) AS downloads
FROM downloads
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY day
ORDER BY day DESC;

-- Downloads per hour, last 24 hours
SELECT DATE_TRUNC('hour', created_at) AS hour, COUNT(*) AS downloads
FROM downloads
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY hour
ORDER BY hour DESC;
```

## Future extensions (not in scope now)

These are deliberately out of scope but cheap to add later:

- **Country logging:** add `country TEXT` column, read from Vercel's `x-vercel-ip-country` header.
- **Referrer logging:** add `referrer TEXT`, read from request `Referer` header.
- **App version:** add `version TEXT`, pass as query param when GitHub release URLs become version-specific.
- **Bot filtering:** in the function, skip INSERT if user-agent matches a small denylist.
- **Daily email summary:** add a Vercel Cron Job that queries the table and emails via Resend.

Each is additive — no schema migration headache because existing rows would just have `NULL` for new columns.

## File changes summary

| File | Change |
|---|---|
| `api/track-download.js` | NEW — ~15-line serverless function |
| `src/components/DownloadModal.jsx` | MODIFY — add `fetch` call in `startDownload()` |
| `package.json` | MODIFY — add `@vercel/postgres` dependency |
| Vercel dashboard | ONE-TIME — create Postgres DB, link to project, run `CREATE TABLE` |
