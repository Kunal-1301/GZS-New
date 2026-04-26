"""
Database configuration and connection setup
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://gzone_user:gzone_password@localhost:5432/gzonesphere"
)

# Create engine with appropriate settings
engine = create_engine(
    DATABASE_URL,
    poolclass=NullPool if os.getenv("ENV") == "development" else None,
    echo=os.getenv("SQL_ECHO", "false").lower() == "true",
    future=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False
)

def get_db():
    """Dependency for FastAPI to inject DB session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database tables"""
    from models import Base
    Base.metadata.create_all(bind=engine)

def drop_all_tables():
    """Drop all tables (use with caution)"""
    from models import Base
    Base.metadata.drop_all(bind=engine)
