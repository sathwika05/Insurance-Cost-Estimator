---
title: Medical Insurance Cost Predictor
emoji: 🩺
colorFrom: green
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# Medical Insurance Cost Predictor

A full-stack machine learning application that estimates annual medical insurance
cost from six patient attributes: age, sex, BMI, number of children, smoker status,
and US region.

**Live app:** served by a single container — FastAPI handles `/api/*` and serves the
compiled React front-end for everything else.

## Model

A scikit-learn `TransformedTargetRegressor` (log1p / expm1 on the target) wrapping a
`Pipeline` of `ColumnTransformer` (StandardScaler on numeric features, OneHotEncoder
on categorical features) into a tuned `RandomForestRegressor`. Six model families were
compared with 5-fold cross-validation; Random Forest won on MAE and was tuned with
GridSearchCV.

| Metric | Held-out test |
| --- | --- |
| MAE | $1,960 |
| RMSE | $4,283 |
| R² | 0.90 |

The trained pipeline is loaded once at startup from `models/insurance_model.joblib`
and never retrains at request time.

## Architecture

```
React 19 + Vite  →  Pydantic validation  →  FastAPI  →  scikit-learn pipeline  →  Random Forest
```

- `artifacts/front-end` — React 19 + Vite + Tailwind UI (Predictor, Use Case, About
  Model, Performance, Dataset).
- `artifacts/ml-server` — FastAPI inference service exposing `POST /api/predict` and
  `GET /api/healthz`.
- `artifacts/back-end` — Express API, scaffolding for future non-ML routes; not part
  of the deployed container.
- `lib/api-spec` — OpenAPI contract; Orval generates the React Query hooks and Zod
  schemas from it.

## Local development

```bash
pnpm install
bash artifacts/ml-server/start.sh                              # ML API on :8001
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/front-end run dev  # UI on :5173
```

Vite proxies `/api/predict` to the ML server in development; in the container both are
served from the same origin.

## Deployment

```bash
docker build -t insurance-cost-estimator .
docker run --rm -p 7860:7860 insurance-cost-estimator   # http://localhost:7860
```

The same `Dockerfile` is what Hugging Face Spaces builds from — the YAML front matter
above configures the Space.

## API

```bash
curl -X POST http://localhost:7860/api/predict \
  -H 'content-type: application/json' \
  -d '{"age":35,"sex":"male","bmi":24.5,"children":1,"smoker":"no","region":"southeast"}'
# {"estimated_annual_cost":6421.37,"currency":"USD"}
```

Cost estimates are model outputs for exploration, not insurance quotes.
