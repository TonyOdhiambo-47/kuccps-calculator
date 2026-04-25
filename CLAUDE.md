# CLAUDE.md — kuccps-calculator

Working notes for Claude (and for me). The principles here apply to every change in this repo.

## What this is

A static Vite app that estimates a Kenyan student's KUCCPS weighted cluster points and shows competitive degree programmes against the published 2023 cutoffs. Estimate, not placement.

## Engineering principles

1. **Transparent math, no hidden weights.** The scoring formula is in the README and the source matches it line-for-line. If the formula changes, both must change in the same commit.
2. **Cutoff data is sourced.** Every cluster cutoff in `src/data/` traces to a KUCCPS-published PDF. New programmes need a citation in the PR.
3. **Estimate framing is non-negotiable.** Every results view must say "estimate" prominently. The official portal is the placement authority — link to it.
4. **No frameworks, vanilla TS.** Vite + TypeScript. No React, no router, no state library. Keep total gzipped JS under ~25 KB.
5. **Mobile-first.** Kenyan students on shared phones over slow connections are the user. Test under 3G throttling before claiming a UI improvement.
6. **Type-checked.** `npm run typecheck` must pass. CI enforces this.

## Security principles

1. **Inputs are constrained at the source.** Grades are an enum (`A` through `E`), not free text. Don't add free-text paths into the scoring engine without a validator.
2. **CSP is the second line.** `vercel.json` enforces `script-src 'self'` with no `unsafe-eval`. Adding an external script origin is almost always the wrong move — copy the code instead.
3. **Dependency review before install.** Before `npm install X`, check weekly downloads, last publish date, and transitive depth. Prefer copying ~30 lines over adding a 50-package tree.
4. **No secrets in the repo.** This app is client-side by design.

## CI

`.github/workflows/ci.yml` runs typecheck + build on every push and PR. Audit job runs `npm audit --audit-level=high` informationally.

## Deploys

Vercel auto-deploys from `main`. Preview deploys on every PR. `main` is production.
