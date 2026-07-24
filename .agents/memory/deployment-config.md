---
name: Deployment config in this workspace
description: Where production deploy config lives and ML server dep-install approach
---
- Production deploy config lives in each artifact's `.replit-artifact/artifact.toml` `[services.production]`; `.replit` `[deployment]` is only a pre-build hook. Edit via the temp-file `verifyAndReplaceArtifactToml` flow.
- **Why:** pnpm-workspace deployments ignore `.replit` run; the shared proxy routes all services (frontend static `/`, Express `/api`, Python ML `/api/predict`) in production just like dev.
- Managed dev workflows do NOT run from the repo root — dev `run` commands need absolute paths (e.g. `bash /home/runner/workspace/...`); production `run`/`build` args run from workspace root, so relative paths work there.
- Python ML deps: install at deploy build time with `bash artifacts/ml-server/setup.sh` (uv + requirements.txt); `start.sh` calls setup (no-op if satisfied) then execs uvicorn. Don't rely on the checked-in `.venv`.
