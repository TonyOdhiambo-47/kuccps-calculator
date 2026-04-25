# Security Policy

## Reporting a vulnerability

Please email **tony_odh@mit.edu** with details. Do not open a public GitHub issue for security problems.

Acknowledgement target: 72 hours.

## Scope

KUCCPS Calculator is a static client-side app with no backend. Realistic threats:

- XSS via injected URL parameters or DOM sinks
- Misleading or outdated cutoff data (a correctness issue, but reportable here)
- Dependency supply-chain compromise (build-time or transitive)
- CSP bypass

Out of scope: rate limiting, server-side issues, account takeover (there are no accounts and no server). The official KUCCPS portal at `kuccps.ac.ke` is out of scope — direct issues there to KUCCPS.

## Hardening in place

- Strict `Content-Security-Policy` via `vercel.json` (`script-src 'self'`, no `unsafe-eval`, no third-party script origins)
- `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, locked-down `Permissions-Policy`, strict `Referrer-Policy`
- CI runs typecheck + build + `npm audit` on every push and PR to `main`
- Grade inputs are constrained to the KNEC enum; no free-text path to the scoring engine
- No telemetry, no analytics, no third-party scripts loaded at runtime
