#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"
PYTHON="$VENV_DIR/bin/python"

# Create venv only if it doesn't already have Python
if [ ! -x "$PYTHON" ]; then
  echo "Creating virtual environment..."
  uv venv "$VENV_DIR"
fi

# Install / sync packages (fast no-op if already satisfied)
echo "Syncing ML dependencies..."
uv pip install --quiet --python "$PYTHON" \
  fastapi "uvicorn[standard]" pandas numpy joblib scikit-learn xgboost pydantic

echo "Starting ML prediction server on port ${PORT:-8001}..."
exec "$PYTHON" "$SCRIPT_DIR/main.py"
