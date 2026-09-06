# Medical Insurance Cost Predictor

Estimate annual US medical insurance cost from six patient attributes, served by a trained
scikit-learn pipeline behind a FastAPI inference service and a React front-end.

**Live app → https://insurance-cost-estimator-j5cg.onrender.com**

![Medical Insurance Cost Predictor](artifacts/front-end/public/medical-insurance-cost-predictor.png)

---

## What it does

A user enters age, sex, BMI, number of dependents, smoking status, and US region. The request is
validated, passed through the trained preprocessing and prediction pipeline, and an estimated annual
cost is returned and rendered — typically in well under a second.

The app is a single page with five views: **Predictor** (run a prediction), **Use Case** (problem,
system workflow, business value), **About Model** (how the model was developed), **Performance**
(evaluation results), and **Dataset** (features, EDA findings, preprocessing).

## The model

The deployed artifact is a scikit-learn `TransformedTargetRegressor` — `log1p` on the target,
`expm1` on the way back out, which stabilises the heavy right skew in medical charges:

```
TransformedTargetRegressor (log1p / expm1)
└── Pipeline
    ├── ColumnTransformer
    │   ├── num: StandardScaler       → age, bmi, children
    │   └── cat: OneHotEncoder        → sex, smoker, region
    └── RandomForestRegressor
```

Tuned hyperparameters, as stored in the artifact:

| Parameter | Value |
| --- | --- |
| `n_estimators` | 600 |
| `max_depth` | 8 |
| `min_samples_split` | 10 |
| `min_samples_leaf` | 4 |
| `max_features` | 0.6 |
| `random_state` | 42 |

The pipeline is loaded once at process start as a singleton (`core/model.py`) and never retrains —
each request is a single `predict()` call.

## Results

Six model families were compared with 5-fold cross-validation. Random Forest had the lowest CV MAE
and went forward to `GridSearchCV` tuning:

| Model | CV MAE | CV RMSE | CV R² | |
| --- | ---: | ---: | ---: | --- |
| Linear Regression | $4,221.96 | $6,123.65 | 0.723 | baseline |
| Ridge Regression | $4,226.80 | $6,123.65 | 0.723 | |
| Lasso Regression | $4,222.00 | $6,123.43 | 0.723 | |
| Decision Tree | $3,284.18 | $6,777.52 | 0.659 | |
| XGBoost | $3,104.85 | $5,375.65 | 0.785 | |
| **Random Forest** | **$2,742.90** | **$4,894.45** | **0.821** | selected |

Final performance of the tuned model on the held-out test split:

| Metric | Value |
| --- | --- |
| MAE | ~$1,960 |
| RMSE | ~$4,283 |
| R² | ~0.90 |

The two tables measure different things — cross-validation across candidate models during selection,
versus the tuned model scored once on data it never saw. The tuned model is meaningfully better than
its own CV row, which is expected after hyperparameter search.

## Dataset

1,338 records, six predictors and one target (`charges`), with no missing values.

| Feature | Type | Notes |
| --- | --- | --- |
| `age` | numerical | 18–64 in the data |
| `sex` | categorical | male / female |
| `bmi` | numerical | 16.0–53.1 in the data |
| `children` | numerical | 0–5 in the data |
| `smoker` | categorical | yes / no |
| `region` | categorical | northeast / northwest / southeast / southwest |

Smoking status dominates: it correlates with charges at **0.79**, against 0.30 for age and 0.20 for
BMI. The target is heavily right-skewed (skew 1.52), which is what the log transform addresses. The
train/test split is taken before any scaling, so no test statistics leak into training.

## Architecture

```
Browser
  │
  ├── GET  /            → React SPA (static files)
  └── POST /api/predict → FastAPI → Pydantic validation → sklearn pipeline → cost estimate
```

In production, one container serves both: FastAPI handles `/api/*` and serves the compiled front-end
for every other path, so there is no cross-origin hop between the UI and the model.

| Package | Stack | Role |
| --- | --- | --- |
| `artifacts/front-end` | React 19, Vite, Tailwind, Framer Motion | The UI |
| `artifacts/ml-server` | Python, FastAPI, scikit-learn | Inference service + static hosting |
| `artifacts/back-end` | Express 5 | `/api/healthz`; scaffolding for future non-ML routes |
| `lib/api-spec` | OpenAPI + Orval | Source of truth for the API contract |
| `lib/api-client-react` | TanStack Query | Generated hooks used by the UI |
| `lib/api-zod` | Zod | Generated runtime schemas |

**Contract-first:** `lib/api-spec/openapi.yaml` defines the API, and Orval generates the React Query
hooks and Zod schemas from it — the generated directories are never hand-edited. The Python service
mirrors the same contract in its own Pydantic models (`schemas/prediction.py`); nothing generates
Python from the spec, so those two are kept in sync by hand.

## API

**`POST /api/predict`**

```bash
curl -X POST https://insurance-cost-estimator-j5cg.onrender.com/api/predict \
  -H 'content-type: application/json' \
  -d '{"age":35,"sex":"male","bmi":24.5,"children":1,"smoker":"no","region":"southeast"}'
```

```json
{ "estimated_annual_cost": 5576.34, "currency": "USD" }
```

Every field is required and bounded — `age` 18–100, `bmi` 10–70, `children` 0–10, with the
categoricals restricted to the values above. Anything outside those bounds returns `422` with a
message naming the offending field, so bad input never reaches the model.

**`GET /api/healthz`** → `{"status":"ok","model":"loaded"}` — confirms the process is up *and* the
pipeline deserialized.

## Running locally

Requires Node 20+, pnpm 9+, and [uv](https://github.com/astral-sh/uv) (the ML server's setup script
uses it to create its virtualenv).

```bash
pnpm install                                              # pnpm only; npm/yarn are blocked

bash artifacts/ml-server/start.sh                         # ML API on :8001 (creates a venv on first run)
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/front-end run dev   # UI on :5173
```

Vite proxies `/api/predict` to the ML server in development. The front-end and back-end deliberately
throw at startup when `PORT` (and `BASE_PATH` for the front-end) are missing rather than guessing a
default.

Other useful commands:

```bash
pnpm run typecheck                                        # libs, then artifacts and scripts
pnpm run build                                            # typecheck, then build every package
pnpm --filter @workspace/api-spec run codegen             # regenerate hooks + Zod schemas from openapi.yaml
```

## Deployment

The whole app builds into one image — a Node stage compiles the front-end, a Python stage installs
the ML dependencies and copies the compiled assets in:

```bash
docker build -t insurance-cost-estimator .
docker run --rm -p 7860:7860 insurance-cost-estimator      # http://localhost:7860
```

`render.yaml` deploys that image to Render on every push to `main`, with a health check on
`/api/healthz`. The host's injected `PORT` is read by `config/settings.py`, so the same image runs
unchanged anywhere.

Python dependencies are pinned to the exact versions the model was serialized with — scikit-learn
1.9.0, NumPy 2.5.1, SciPy 1.18.0 — because a mismatched scikit-learn can fail to unpickle the
artifact. Bump them only alongside a re-exported model.

Render's free tier stops a service after 15 minutes without traffic, so an external cron
(cron-job.org) requests `/api/healthz` every 10 minutes to keep it warm.

## Notes and limitations

- Estimates are model outputs for exploration, not insurance quotes.
- The model is frozen at training time. Real medical costs drift year over year, so the predictions
  age with the 1,338-record dataset behind them.
- Six features cannot capture everything that drives a premium — no medical history, no plan tier,
  no claims data.
- The API accepts values the data never covered: `children` up to 10 where the dataset stops at 5,
  and `age` to 100 where it stops at 64. Those requests extrapolate, and the model has no way to
  signal that.
- With `max_depth=8` and no per-prediction interval, outputs are point estimates. Treat the ~$1,960
  MAE as the practical error bar.

## License

MIT
