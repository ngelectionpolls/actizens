# ASIF — Actizens Social Impact Foundation

A Next.js 14 website for the Active Citizens Hero Award, an election monitoring initiative in Nigeria. Generated from Figma via Anima.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI components
- **Maps**: react-simple-maps + d3-scale
- **Icons**: lucide-react

## Pages

- `/` — Homepage (hero, live donations ticker, stats)
- `/about` — About ASIF
- `/the-award` — The Award details
- `/how-it-works` — How It Works
- `/states` — States map/view
- `/news` — News
- `/login` — Login
- `/register` — Register
- `/contact` — Contact

## Running locally

```bash
npm run dev       # starts on port 5000
npm run build     # production build
npm start         # serve production build
```

## Notes

- The `.env` file contains Supabase credentials from a prototype — replace with real credentials if auth/data features are needed.
- Originally configured for Netlify deployment (`netlify.toml` present).

## User preferences

<!-- Add any remembered user preferences here -->
