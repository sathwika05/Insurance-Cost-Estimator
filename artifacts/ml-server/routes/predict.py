import pandas as pd
from fastapi import APIRouter, HTTPException
from schemas.prediction import PredictionInput, PredictionResult
from core.model import model

router = APIRouter()


@router.get("/api/healthz")
def health_check():
    return {"status": "ok", "model": "loaded"}


@router.post("/api/predict", response_model=PredictionResult)
def predict(payload: PredictionInput):
    try:
        input_df = pd.DataFrame(
            [{
                "age": payload.age,
                "sex": payload.sex,
                "bmi": payload.bmi,
                "children": payload.children,
                "smoker": payload.smoker,
                "region": payload.region,
            }],
            columns=["age", "sex", "bmi", "children", "smoker", "region"],
        )
        prediction = model.predict(input_df)[0]
        return PredictionResult(
            estimated_annual_cost=round(float(prediction), 2),
            currency="USD",
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}")
