#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$SCRIPT_DIR/.venv"
PYTHON="$VENV_DIR/bin/python"

# In production the build step already ran setup.sh.
# Only run setup in development (no PRODUCTION env var set).
if [ -z "$PRODUCTION" ]; then
  bash "$SCRIPT_DIR/setup.sh"
fi

echo "Starting ML prediction server on port ${PORT:-8001}..."
exec "$PYTHON" "$SCRIPT_DIR/main.py"
