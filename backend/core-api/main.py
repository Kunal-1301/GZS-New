from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
from dotenv import load_dotenv

load_dotenv()

from routes import auth
from middleware import ErrorHandlerMiddleware, LoggingMiddleware
from database import init_db

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="GzoneSphere Core API",
    version="2.0.0",
    description="Phase 2: Authentication foundation for GzoneSphere"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(LoggingMiddleware)
app.add_middleware(ErrorHandlerMiddleware)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])


@app.on_event("startup")
async def startup_event():
    """Initialize database on startup."""
    logger.info("Initializing database...")
    try:
        init_db()
        logger.info("Database initialized successfully")
    except Exception as exc:
        logger.error(f"Failed to initialize database: {exc}")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "GzoneSphere Core API v2.0 Operational",
        "status": "ONLINE",
        "version": "2.0.0",
        "phase": "Phase 2: Authentication"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "GzoneSphere Core API",
        "version": "2.0.0"
    }
