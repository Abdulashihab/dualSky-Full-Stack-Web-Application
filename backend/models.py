"""SQLAlchemy models for the DualSky backend.

Defines the User and Package tables, sharing the declarative Base from
database.py.
"""

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    subscriber_id = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    balance = Column(Float, default=0.0, nullable=False)
    active_package = Column(Integer, ForeignKey("packages.id"), nullable=True)

    package = relationship("Package", back_populates="users")


class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    language = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    channel_count = Column(Integer, nullable=False)
    channels_summary = Column(String, nullable=True)

    users = relationship("User", back_populates="package")