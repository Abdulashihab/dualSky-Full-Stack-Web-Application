"""SQLAlchemy models for the DualSky backend.

Defines the Subscriber, Package, and Channel tables matching dualsky_data.json,
sharing the declarative Base from database.py.
"""

from sqlalchemy import Column, Integer, String, Float, Text, Date

from database import Base


class Subscriber(Base):
    __tablename__ = "subscribers"

    id = Column(Integer, primary_key=True, index=True)
    subscriber_id = Column(String, unique=True, index=True, nullable=False)
    rmn = Column(String, nullable=False)
    name = Column(String, nullable=False)
    kind = Column(String, nullable=False)
    status = Column(String, nullable=False)
    balance = Column(Float, nullable=False)
    monthly_charge = Column(Float, nullable=False)
    due_date = Column(Date, nullable=False)
    packs = Column(Text, nullable=False)
    work_order = Column(Text, nullable=True)
    address = Column(String, nullable=False)


class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)
    pack_id = Column(String, unique=True, index=True, nullable=False)
    language = Column(String, nullable=False)
    pack_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    channel_nos = Column(Text, nullable=False)


class Channel(Base):
    __tablename__ = "channels"

    id = Column(Integer, primary_key=True, index=True)
    channel_no = Column(String, unique=True, index=True, nullable=False)
    channel_name = Column(String, nullable=False)
    language = Column(String, nullable=False)
    resolution = Column(String, nullable=False)
    genre = Column(String, nullable=False)
    la_carte_price = Column(Float, nullable=False)