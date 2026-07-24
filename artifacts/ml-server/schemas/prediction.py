from typing import Literal
from pydantic import BaseModel, Field


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
