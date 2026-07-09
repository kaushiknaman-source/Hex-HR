# Hexagon JD Agent — AI-Powered Job Description Studio

Next.js 15 (App Router) + TypeScript + Tailwind, built for serverless deployment on Vercel.
Uses the Anthropic API exclusively, called only from server-side route handlers.

## Quick start

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```

Deploy: push to GitHub, import into Vercel, add `ANTHROPIC_API_KEY` as an environment
variable in Project Settings. No other config needed — everything here is serverless
(Route Handlers, no long-running processes, no local DB).

## What's implemented

- **App shell**: sidebar, top nav, dashboard stat cards — matches the reference screenshot's
  IA but restructured for cleaner spacing/hierarchy.
- **Create JD workspace**: full form (position, department, experience, employment type,
  qualifications, state→city cascading location, single unified skills field, draggable
  responsibilities editor, notes) with a live document-style preview pane.
- **Claude integration**: `app/api/generate-jd` and `app/api/improve-jd` route handlers call
  Claude Sonnet server-side and return structured JSON only — the frontend never renders raw
  model text. Prompts live in `lib/prompts/`, separated from route logic, per spec.
- **Refine toolbar**: Improve / Shorten / More Formal / More Technical / ATS Optimize /
  Regenerate, each a distinct prompt variant reusing the same JSON contract.
- **Quality score**: circular indicator driven by Claude's own self-assessment of the JD.
  Branding: Tailwind theme in `tailwind.config.ts` uses the exact Hexagon palette from the
  brand guideline doc (Primary Sky/Land/Sea, accents, backgrounds, neutrals restricted to
  web-template use, special-use red/yellow reserved for warnings only). No hexagon/honeycomb
  decorative motifs anywhere, per spec.
- Loading state cycles through the specified copy ("Analyzing Position…" etc.) instead of a
  generic spinner.

## What's stubbed / next steps

These are wired up in the UI but need backend implementation — good next tasks in Claude Code:

1. **Persistence** — Saved JDs, Templates, AI Suggestions pages are placeholders. Add a
   datastore (Vercel Postgres, Supabase, or KV) and CRUD routes.
2. **DOCX/PDF export** — `docx` package is already a dependency; `ExportToolbar` has a stub
   where an `/api/export/docx` route should build the file server-side. Print-to-PDF via
   `window.print()` works today with a print stylesheet you'll want to add.
3. **Share** — generate a shareable link/token for a saved JD.
4. **Auth** — no auth layer yet; add NextAuth or your SSO provider before internal rollout.
5. **AI Suggestions panel** — currently just a static suggestion list embedded in the prompt;
   wire a dedicated endpoint if you want it to react live as skills are typed.
6. **Font** — Geist is referenced via CSS variable; add `next/font/google` or self-hosted
   Hexagon Akkurat if you have a licensed font file.

## Architecture notes

- `lib/anthropic.ts` — server-only Anthropic client (`import 'server-only'` blocks accidental
  client-side imports at build time).
- `lib/prompts/system.ts` / `lib/prompts/user.ts` — all prompt text, isolated from route code.
- `lib/types/jd.ts` — the single source of truth for the JD shape both Claude's JSON output
  and the React components must match.
- `lib/data/*.json` — positions, departments, qualifications, and India state→city maps as
  editable config, not hardcoded in components.

This structure is intentionally left flat enough to add Resume Screening, Interview Question
Generator, etc. as new `app/<feature>` routes + `lib/prompts/<feature>.ts` pairs without
touching the existing ones.
