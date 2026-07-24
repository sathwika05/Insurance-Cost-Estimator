from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config.settings import PORT
from routes.predict import router

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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT, log_level="info")
