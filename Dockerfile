# Single-image deployment: the FastAPI ML server serves both /api/* and the
# compiled React front-end, so the whole app runs on one port and one origin.
# Used by Hugging Face Spaces (sdk: docker); builds anywhere Docker runs.

# ---- Stage 1: compile the front-end ----------------------------------------
FROM node:24-slim AS frontend

ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /repo
COPY . .

RUN pnpm install --frozen-lockfile --filter "@workspace/front-end..."

# vite.config.ts requires both of these; PORT only matters for the dev server.
ENV PORT=5173
ENV BASE_PATH=/
RUN pnpm --filter @workspace/front-end run build

# ---- Stage 2: runtime ------------------------------------------------------
FROM python:3.13-slim AS runtime

ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1
# Hugging Face Spaces expects the app on 7860 (see app_port in README.md).
ENV PORT=7860

WORKDIR /app

COPY artifacts/ml-server/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY artifacts/ml-server/ ./
COPY --from=frontend /repo/artifacts/front-end/dist/public ./public

EXPOSE 7860
CMD ["python", "main.py"]
