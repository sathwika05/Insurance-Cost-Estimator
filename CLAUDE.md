# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A full-stack medical insurance cost predictor. Users submit 6 patient fields (age, sex, bmi, children,
smoker, region) and get back an estimated annual insurance cost in USD from a pre-trained model.
This is a Replit-managed pnpm monorepo (Replit's "Agent"/"artifact" tooling controls dev workflow and
deployment — see `.replit` and each artifact's `.replit-artifact/artifact.toml`).

## Commands

```bash
pnpm install                                          # install (pnpm only — enforced by preinstall script)
pnpm run typecheck                                    # typecheck everything (libs + artifacts + scripts)
pnpm run build                                        # typecheck, then build every package that has a build script
pnpm --filter @workspace/api-spec run codegen          # regenerate API hooks + Zod schemas from openapi.yaml
pnpm --filter @workspace/front-end run dev             # frontend dev server (needs PORT + BASE_PATH, see below)
pnpm --filter @workspace/back-end run dev              # Express API dev server (needs PORT)
bash artifacts/ml-server/start.sh                      # ML FastAPI dev server (installs venv on first run)
pnpm --filter db run push                              # apply lib/db Drizzle schema to DATABASE_URL (drizzle-kit push)
```

There is no test suite configured yet — `src/tests` (back-end) and `tests` (ml-server) exist only as empty
placeholders. Don't assume a `test` script exists.

`front-end` and `ml-server` both throw at startup if required env vars (`PORT`, `BASE_PATH` for the
frontend) are missing — this is intentional, not a bug to "fix" with a fallback default.

## Architecture

Three runtime services, wired together by Replit's shared proxy (not by any code in this repo):

- **`artifacts/front-end`** (`@workspace/front-end`) — React 19 + Vite + Tailwind, served at `/`. Single
  page (`src/pages/home.tsx`) that swaps between four sections (Predictor / About / Performance / Dataset)
  via local state — there is no real router beyond a wouter catch-all for 404s.
- **`artifacts/back-end`** (`@workspace/back-end`) — Express 5, served at `/api`. Currently only handles
  `/api/healthz`; everything under `src/{config,core,database,lib,middleware,models,repositories,schemas,services}`
  is scaffolding (`.gitkeep` only) for future non-ML API routes.
- **`artifacts/ml-server`** — Python FastAPI + Uvicorn, its own process, routed directly at `/api/predict`
  by the proxy (bypasses the Express back-end entirely). Loads `models/insurance_model.joblib` once at
  startup as a singleton (`core/model.py`) and never retrains — `model.predict()` is just called per
  request in `routes/predict.py`. The joblib is a scikit-learn `TransformedTargetRegressor` (log1p/expm1
  on the target) wrapping a `Pipeline` of `ColumnTransformer` (StandardScaler on numeric fields, OneHotEncoder
  on categorical fields) → `RandomForestRegressor`. `requirements.txt` lists `xgboost` but nothing in the
  code path actually uses it — don't assume the model is XGBoost-based.

Both artifact.toml health checks matter and are separate from each other: the back-end's `/api/healthz`
(`src/routes/health.ts`) and the ML server's own hardcoded `/api/healthz` (`routes/predict.py`) are checked
directly against each service's own port by Replit's deploy tooling — they are not the same endpoint the
proxy exposes externally, so don't assume touching one affects the other.

### API contract flow

`lib/api-spec/openapi.yaml` is the single source of truth for the API. Orval (`lib/api-spec/orval.config.ts`)
generates two consumers from it — never hand-edit their `generated/` output, re-run codegen instead:

- `lib/api-client-react/src/generated/` — React Query hooks (e.g. `usePredictInsuranceCost`, consumed
  directly by `PredictorSection.tsx`)
- `lib/api-zod/src/generated/` — Zod schemas, used for runtime validation on the Express side (e.g.
  `HealthCheckResponse` in `health.ts`)

The Python ml-server has its own independent Pydantic schemas (`schemas/prediction.py`) that mirror the
OpenAPI spec's `PredictionInput`/`PredictionResult` by hand — if you change one, update the other, since
nothing generates Python from `openapi.yaml`.

Do not change `info.title` in `openapi.yaml` — the codegen filenames assume the title is `Api` (see the
`titleTransformer` in `orval.config.ts`).

### Other packages

- **`lib/db`** (`@workspace/db`) — Drizzle ORM + `pg`, set up but not yet used by any service (schema is
  empty/scaffolded). Requires `DATABASE_URL`. `pnpm --filter db run push`/`push-force` apply schema changes.
- **`artifacts/mockup-sandbox`** (`@workspace/mockup-sandbox`) — a standalone Vite app used by Replit's
  design tooling for isolated component prototyping (served at `/__mockup`). Not part of the deployed
  product; its `src/components/ui` is a parallel copy of the same shadcn-derived components as `front-end`.
- **`scripts`** (`@workspace/scripts`) — misc TS scripts run via `tsx`.

### Workspace/build conventions

- pnpm workspaces only (`preinstall` hard-fails under npm/yarn); catalog-pinned deps live in
  `pnpm-workspace.yaml`.
- TS project references: root `tsconfig.json` references `lib/*`; each artifact's `tsconfig.json`
  references the `lib` packages it depends on. `pnpm run typecheck` builds libs first (`tsc --build`),
  then typechecks artifacts + scripts.
- `back-end` builds with esbuild (`build.mjs`) into a single ESM bundle (`dist/index.mjs`) with a long list
  of externalized native-module packages — extend that `external` list rather than fighting esbuild if a
  new dependency fails to bundle.
- Deployment specifics (ports, health check timeouts, build/run commands per service) live in each
  artifact's `.replit-artifact/artifact.toml`, not in `.replit`. `.replit` only holds workflow/module/port
  wiring for the Replit dev environment.
