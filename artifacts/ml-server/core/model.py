import sys
import joblib
from config.settings import MODEL_PATH


def load_model():
    if not MODEL_PATH.exists():
        print(
            f"ERROR: Model file not found at {MODEL_PATH}. "
            "Ensure insurance_model.joblib is placed in ml-server/models/.",
            file=sys.stderr,
        )
        sys.exit(1)
    try:
        loaded = joblib.load(MODEL_PATH)
        print(f"Model loaded successfully from {MODEL_PATH}")
        return loaded
    except Exception as exc:
        print(f"ERROR: Failed to load model: {exc}", file=sys.stderr)
        sys.exit(1)


# Singleton — loaded once at startup
model = load_model()
