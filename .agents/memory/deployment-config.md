---
name: Deployment config
description: Production deployment setup for the Insurance Cost Predictor — key decisions and gotchas.
---

# Deployment Configuration

## Key decisions

- `deploymentTarget = "autoscale"` in `.replit` (was `vm` — changed to match the app's stateless API design)
- Production config lives in each artifact's `.replit-artifact/artifact.toml`, not in `.replit`
- Dev workflow commands use absolute paths (e.g. `bash /home/runner/workspace/artifacts/ml-server/start.sh`); production run commands use repo-relative paths
- ML Python deps install at deploy build time via `artifacts/ml-server/setup.sh` (runs `uv venv` + `uv pip install`)

## ML server .venv exclusion

The `.venv` directory (~900MB) lives at `artifacts/ml-server/.venv` and must NOT be shipped in the deployment bundle.
`.gitignore` excludes it via `artifacts/ml-server/.venv/` and `**/__pycache__/`.
The production build step runs `setup.sh` which recreates the venv at deploy time.

**Why:** Without exclusion the deployment upload exceeds size limits and fails silently.

## Health check

Back-end health check: `GET /api/healthz` → `{"status":"ok"}` (defined in `artifacts/back-end/src/routes/health.ts`).
`artifact.toml` sets `timeoutSeconds = 60` to give the server enough leeway to boot before the check runs.

## Production build verification

Both builds succeed locally:
- Back-end: `pnpm --filter @workspace/back-end run build` → `artifacts/back-end/dist/index.mjs`
- Front-end: `PORT=25780 BASE_PATH=/ pnpm --filter @workspace/front-end run build` → `artifacts/front-end/dist/public/`
  - Note: `vite.config.ts` requires both `PORT` and `BASE_PATH` env vars at build time (throws if missing); `[services.env]` in the front-end `artifact.toml` supplies them.
- ML server: `bash artifacts/ml-server/setup.sh` installs deps cleanly; `start.sh` boots FastAPI on the configured PORT.
