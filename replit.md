# Medical Insurance Cost Predictor

A full-stack medical insurance cost prediction app that uses a trained XGBoost ML model to estimate annual insurance costs based on patient details.

## Run & Operate

- `artifacts/insurance-app: web` — React+Vite frontend (port 25780, served at `/`)
- `artifacts/api-server: API Server` — Express API server (port 8080, served at `/api`)
- `artifacts/api-server: ML Server` — Python FastAPI ML server (port 8001, served at `/api/predict`)
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS (artifacts/insurance-app)
- API: Express 5 (artifacts/api-server)
- ML API: Python FastAPI + Uvicorn + XGBoost + Scikit-learn (artifacts/ml-server)
- Model: Pre-trained XGBoost pipeline (artifacts/ml-server/insurance_model.joblib)
- Validation: Zod (server), Pydantic (Python)
- API codegen: Orval (from OpenAPI spec)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `lib/api-client-react/src/generated/` — generated React Query hooks
- `lib/api-zod/src/generated/` — generated Zod validation schemas
- `artifacts/insurance-app/src/` — React frontend
- `artifacts/api-server/src/` — Express API server
- `artifacts/ml-server/main.py` — FastAPI ML prediction server
- `artifacts/ml-server/insurance_model.joblib` — trained XGBoost model (do not retrain)
- `artifacts/ml-server/.venv/` — Python virtual environment (managed by uv)

## Architecture decisions

- Python ML server runs as a separate service (port 8001) routed at `/api/predict` via the shared proxy; Express handles all other `/api/*` routes.
- Python packages installed into a local `.venv` using `uv` (fast, avoids Nix pip conflicts).
- Model is loaded once at startup and never retrained; `model.predict()` is called for every request.
- OpenAPI spec defines the predict endpoint at `/api/predict` — codegen generates the frontend hook `usePredictInsuranceCost`.
- Inputs are validated by both Pydantic (Python) and Zod (generated from OpenAPI spec).

## Product

Users enter 6 patient details (age, sex, BMI, children, smoker, region) and the app predicts their estimated annual insurance cost in USD using a real XGBoost model trained on the insurance dataset.

## User preferences

_Populate as you build._

## Deployment

- Production config lives in each artifact's `.replit-artifact/artifact.toml` (`[services.production]`), not in `.replit`.
- Frontend deploys as static files from `artifacts/front-end/dist/public` with an SPA rewrite; Express API and Python ML server deploy as separate services routed at `/api` and `/api/predict` by the shared proxy.
- ML server Python deps install at deploy build time via `bash artifacts/ml-server/setup.sh` (uv + `requirements.txt`); `start.sh` re-runs setup (fast no-op) then starts uvicorn.

## Gotchas

- The ML Server `.venv` must exist before the workflow starts. If you delete it, run `bash artifacts/ml-server/setup.sh` (installs from `artifacts/ml-server/requirements.txt`).
- Do not change `info.title` in the OpenAPI spec — it controls generated filenames.
- The ML model file must stay at `artifacts/ml-server/insurance_model.joblib`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
