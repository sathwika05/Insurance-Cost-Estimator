#!/usr/bin/env bash
# Build-time setup: create the venv and install Python dependencies.
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"
PYTHON="$VENV_DIR/bin/python"

if [ ! -x "$PYTHON" ]; then
  echo "Creating virtual environment..."
  uv venv "$VENV_DIR"
fi

echo "Installing ML dependencies from requirements.txt..."
uv pip install --quiet --python "$PYTHON" -r "$SCRIPT_DIR/requirements.txt"

echo "ML server setup complete."
