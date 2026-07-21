import os
import sys
import json
from pathlib import Path
from typing import Literal

import pandas as pd
import joblib
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

# ── Model loading ──────────────────────────────────────────────────────────────
MODEL_PATH = Path(__file__).parent / "insurance_model.joblib"

if not MODEL_PATH.exists():
    print(
        f"ERROR: Model file not found at {MODEL_PATH}. "
        "Ensure insurance_model.joblib is placed in the ml-server directory.",
        file=sys.stderr,
    )
    sys.exit(1)

try:
    model = joblib.load(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as exc:
    print(f"ERROR: Failed to load model: {exc}", file=sys.stderr)
    sys.exit(1)

# ── FastAPI app ────────────────────────────────────────────────────────────────
app = FastAPI(title="Insurance Cost Prediction API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ────────────────────────────────────────────────────────────────────
class PredictionInput(BaseModel):
    age: int = Field(..., ge=18, le=100, description="Age of primary beneficiary")
    sex: Literal["male", "female"]
    bmi: float = Field(..., ge=10.0, le=70.0, description="Body mass index")
    children: int = Field(..., ge=0, le=10, description="Number of dependents covered")
    smoker: Literal["yes", "no"]
    region: Literal["northeast", "northwest", "southeast", "southwest"]


class PredictionResult(BaseModel):
    estimated_annual_cost: float
    currency: str = "USD"


# ── Routes ─────────────────────────────────────────────────────────────────────
@app.get("/api/healthz")
def health_check():
    return {"status": "ok", "model": "loaded"}


@app.post("/api/predict", response_model=PredictionResult)
def predict(payload: PredictionInput):
    try:
        # Build DataFrame with exact column order the pipeline expects
        input_df = pd.DataFrame(
            [
                {
                    "age": payload.age,
                    "sex": payload.sex,
                    "bmi": payload.bmi,
                    "children": payload.children,
                    "smoker": payload.smoker,
                    "region": payload.region,
                }
            ],
            columns=["age", "sex", "bmi", "children", "smoker", "region"],
        )
        prediction = model.predict(input_df)[0]
        return PredictionResult(
            estimated_annual_cost=round(float(prediction), 2),
            currency="USD",
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}")


# ── Validation error handler (clean JSON, no stack traces) ─────────────────────
@app.exception_handler(422)
async def validation_exception_handler(request: Request, exc):
    errors = exc.errors() if hasattr(exc, "errors") else []
    messages = []
    for err in errors:
        loc = " → ".join(str(l) for l in err.get("loc", []) if l != "body")
        messages.append(f"{loc}: {err.get('msg', 'Invalid value')}" if loc else err.get("msg", "Invalid value"))
    return JSONResponse(
        status_code=422,
        content={"detail": "; ".join(messages) if messages else "Validation error"},
    )


# ── Entrypoint ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8001"))
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")
