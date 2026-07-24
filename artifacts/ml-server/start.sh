#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"
PYTHON="$VENV_DIR/bin/python"

# Ensure dependencies are installed (fast no-op when already satisfied).
bash "$SCRIPT_DIR/setup.sh"

echo "Starting ML prediction server on port ${PORT:-8001}..."
exec "$PYTHON" "$SCRIPT_DIR/main.py"
