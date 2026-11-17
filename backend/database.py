"""SQLAlchemy database configuration for the DualSky backend.

Connects to a local SQLite database file named dualsky.db and exposes the
engine, session factory, and declarative base used by the rest of the app.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./dualsky.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()