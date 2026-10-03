# Recent eyewitness registration feed — NGelectionpolls installation

This is a prepared change for the **existing NGelectionpolls backend**, not a
replacement database or a backend installed in ASIF. No app has been published.

## Install

1. Download `/downloads/ngelectionpolls-recent-eyewitness-feed.zip` from the ASIF
   preview. It contains one new route and this guide.
2. Add `src/app/api/recent-eyewitness-registrations/route.ts` to the existing
   NGelectionpolls source. Do not overwrite any existing route.
   The source copy in this workspace is named
   `recent-eyewitness-registrations.route.ts.txt` to prevent ASIF from trying to
   compile imports belonging to the separate backend.
3. Use the existing backend's MongoDB connection, User model, and
   `donationsGeo.json`. No new secrets, database, dependencies, migrations, or
   data writes are needed.
4. Run the backend's build/tests before releasing this change there. The prepared
   route has been tested with simulated MongoDB rows here; it has **not** been
   executed against the live MongoDB database.
5. When separately authorized to release the NGelectionpolls backend change,
   verify `https://www.ngelectionpolls.org/api/recent-eyewitness-registrations`
   returns HTTP 200 and the documented response.
6. ASIF is already wired to that URL through its own same-origin server endpoint,
   `/api/eyewitness-registrations/recent`. The Hero rechecks every 30 seconds and
   will populate automatically once the upstream endpoint is available.
   **Do not publish ASIF without the owner's separate approval.**

## Feed definition and privacy

- At most 15 newest **account creation times** (`createdAt`), newest first.
  This is not the time biodata was completed or the coverage location was assigned;
  those event times are not stored separately in the uploaded model.
- Only eyewitness accounts with completed biodata and state/LGA/ward locations
  matched against the same registry and normalization used by `reporter-coverage`.
- No active-status or email-verification filter, matching the approved map definition.
- First-name-only when no surname initial is present; no invented names or initials.
- No full surnames, emails, phones, account IDs, LGA/ward/polling-unit details,
  photos, documents, or banking information are exposed in the public response.
  MongoDB itself projects only a surname initial. Locations finer than state
  are used inside the server to check eligibility, then excluded from the response.
- First names with initials are still personal data. Before enabling this public
  endpoint, confirm the platform's privacy notice/permissions allow this display.
- MongoDB reads have an 8-second query limit. Cursor resources are closed.
  Protect the public route using the backend's existing rate limiting if available.
- Errors return 503 rather than invented registrations. An eligible empty feed
  returns 200 with an empty `registrations` array.
- Times are ISO UTC in the API. The ticker shows elapsed time with the exact date
  and time in West Africa Time available on hover.

## Response contract

The top-level keys are `schemaVersion` (the number 1) and `registrations` (an array).
Each registration contains only:

- `firstName`: trimmed first name, maximum 80 characters
- `lastInitial`: one Unicode letter, or an empty string
- `state`: canonical state name, or `FCT`
- `registeredAt`: ISO UTC timestamp from account creation

ASIF validates every entry, strips any unexpected fields, sorts newest first,
rejects malformed feeds, and labels the feed live only after a successful response.
The scrolling ticker pauses on hover and respects reduced-motion preferences.