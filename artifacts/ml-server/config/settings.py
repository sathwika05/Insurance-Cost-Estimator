import os
from pathlib import Path

# Root of the ml-server package
BASE_DIR = Path(__file__).parent.parent

# Trained model artifact
MODEL_PATH = BASE_DIR / "models" / "insurance_model.joblib"

# Server
PORT = int(os.environ.get("PORT", "8001"))
