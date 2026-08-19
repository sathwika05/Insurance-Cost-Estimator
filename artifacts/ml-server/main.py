from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException

from config.settings import PORT
from routes.predict import router

# Populated by the Docker build with the compiled front-end (see /Dockerfile).
# Absent during local development, where Vite serves the UI and proxies /api here.
STATIC_DIR = Path(__file__).parent / "public"

app = FastAPI(title="Insurance Cost Prediction API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.exception_handler(422)
async def validation_exception_handler(request: Request, exc):
    errors = exc.errors() if hasattr(exc, "errors") else []
    messages = []
    for err in errors:
        loc = " → ".join(str(l) for l in err.get("loc", []) if l != "body")
        messages.append(
            f"{loc}: {err.get('msg', 'Invalid value')}" if loc else err.get("msg", "Invalid value")
        )
    return JSONResponse(
        status_code=422,
        content={"detail": "; ".join(messages) if messages else "Validation error"},
    )


class SpaStaticFiles(StaticFiles):
    """Serves the built front-end, falling back to index.html so that a direct
    hit or refresh on any non-asset path still loads the single-page app."""

    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except StarletteHTTPException as exc:
            # Unknown API paths stay JSON 404s; everything else loads the app.
            if exc.status_code == 404 and not path.startswith("api/"):
                return await super().get_response("index.html", scope)
            raise


# Mounted last so the /api routes above always take precedence.
if STATIC_DIR.is_dir():
    app.mount("/", SpaStaticFiles(directory=STATIC_DIR, html=True), name="static")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT, log_level="info")
