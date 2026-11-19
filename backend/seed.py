"""Seed script for the DualSky backend.

Reads dualsky_data.json from the backend folder and loads subscribers, packs,
and channels into the SQLite database, but only when the corresponding tables
are currently empty.
"""

import json
import os
from datetime import date

from database import Base, SessionLocal, engine
from models import Channel, Package, Subscriber

JSON_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dualsky_data.json")


def _is_empty(session, model):
    return session.query(model).first() is None


def seed_database():
    Base.metadata.create_all(bind=engine)

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    session = SessionLocal()
    loaded = {"subscribers": 0, "packs": 0, "channels": 0}

    try:
        subscribers = data.get("subscribers", [])
        if _is_empty(session, Subscriber):
            for s in subscribers:
                session.add(Subscriber(
                    subscriber_id=s["subscriber_id"],
                    rmn=s["rmn"],
                    name=s["name"],
                    kind=s["kind"],
                    status=s["status"],
                    balance=s["balance"],
                    monthly_charge=s["monthly_charge"],
                    due_date=date.fromisoformat(s["due_date"]),
                    packs=json.dumps(s["packs"]),
                    work_order=json.dumps(s["work_order"]) if s.get("work_order") is not None else None,
                    address=s["address"],
                ))
            loaded["subscribers"] = len(subscribers)

        packs = data.get("packs", [])
        if _is_empty(session, Package):
            for p in packs:
                session.add(Package(
                    pack_id=p["pack_id"],
                    language=p["language"],
                    pack_name=p["pack_name"],
                    category=p["category"],
                    price=p["price"],
                    channel_nos=json.dumps(p["channel_nos"]),
                ))
            loaded["packs"] = len(packs)

        channels = data.get("channels", [])
        if _is_empty(session, Channel):
            for c in channels:
                session.add(Channel(
                    channel_no=str(c["channel_no"]),
                    channel_name=c["channel_name"],
                    language=c["language"],
                    resolution=c["resolution"],
                    genre=c["genre"],
                    la_carte_price=c["la_carte_price"],
                ))
            loaded["channels"] = len(channels)

        session.commit()
    finally:
        session.close()

    print(
        f"Seed complete: {loaded['subscribers']} subscribers, "
        f"{loaded['packs']} packs, {loaded['channels']} channels loaded."
    )


if __name__ == "__main__":
    seed_database()