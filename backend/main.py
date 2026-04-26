import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

# Configure structured logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Application starting up... Initializing connections.")
    yield
    logger.info("Application shutting down... Cleaning up resources.")

app = FastAPI(
    title="GzoneSphere Backend API",
    version="1.0.0",
    description="Production-ready minimal backend API",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware for security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], # Restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.middleware("http")
async def global_exception_handler(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as exc:
        logger.exception(f"Unhandled error processing request: {exc}")
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal Server Error"},
        )

@app.get("/api/health", tags=["System"])
async def health_check():
    """Health check endpoint for load balancers."""
    return {"status": "operational", "version": "1.0.0"}

if __name__ == "__main__":
    # Run with standard production settings (multiple workers should ideally be set via CLI/Docker)
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False, workers=4)
