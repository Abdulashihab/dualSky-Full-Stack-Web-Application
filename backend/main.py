"""DualSky backend API built with FastAPI."""

import json
import random
from contextlib import asynccontextmanager
from datetime import date, timedelta

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Base, SessionLocal, engine
from models import Channel, Package, Subscriber
from seed import seed_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    seed_database()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def subscriber_to_dict(sub: Subscriber) -> dict:
    return {
        "id": sub.id,
        "subscriber_id": sub.subscriber_id,
        "rmn": sub.rmn,
        "name": sub.name,
        "kind": sub.kind,
        "status": sub.status,
        "balance": sub.balance,
        "monthly_charge": sub.monthly_charge,
        "due_date": sub.due_date.isoformat() if sub.due_date else None,
        "packs": json.loads(sub.packs) if sub.packs else [],
        "work_order": json.loads(sub.work_order) if sub.work_order else None,
        "address": sub.address,
    }


def package_to_dict(pkg: Package) -> dict:
    return {
        "id": pkg.id,
        "pack_id": pkg.pack_id,
        "language": pkg.language,
        "pack_name": pkg.pack_name,
        "category": pkg.category,
        "price": pkg.price,
        "channel_nos": json.loads(pkg.channel_nos) if pkg.channel_nos else [],
    }


def channel_to_dict(ch: Channel) -> dict:
    return {
        "id": ch.id,
        "channel_no": ch.channel_no,
        "channel_name": ch.channel_name,
        "language": ch.language,
        "resolution": ch.resolution,
        "genre": ch.genre,
        "la_carte_price": ch.la_carte_price,
    }


# --- Request schemas ---

class LoginRequest(BaseModel):
    subscriber_id_or_rmn: str


class SignupRequest(BaseModel):
    name: str
    rmn: str
    address: str


class RechargeRequest(BaseModel):
    subscriber_id: str
    amount: float


class ChatRequest(BaseModel):
    message: str
    subscriber_id: str | None = None


# --- Endpoints ---

@app.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    value = req.subscriber_id_or_rmn
    subscribers = (
        db.query(Subscriber)
        .filter((Subscriber.subscriber_id == value) | (Subscriber.rmn == value))
        .all()
    )
    return [subscriber_to_dict(s) for s in subscribers]


@app.post("/signup")
def signup(req: SignupRequest, db: Session = Depends(get_db)):
    # Generate a unique 6-digit subscriber_id
    subscriber_id = None
    for _ in range(1000):
        candidate = str(random.randint(100000, 999999))
        if not db.query(Subscriber).filter(Subscriber.subscriber_id == candidate).first():
            subscriber_id = candidate
            break
    if subscriber_id is None:
        raise HTTPException(status_code=500, detail="Could not generate unique subscriber_id")

    new_sub = Subscriber(
        subscriber_id=subscriber_id,
        rmn=req.rmn,
        name=req.name,
        kind="primary",
        status="active",
        balance=0.0,
        monthly_charge=153.0,
        due_date=date.today() + timedelta(days=30),
        packs=json.dumps(["DSK-BASIC"]),
        work_order=None,
        address=req.address,
    )
    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)
    return subscriber_to_dict(new_sub)


@app.get("/packages")
def packages(language: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Package)
    if language:
        query = query.filter(Package.language == language)
    packs = query.all()
    return [package_to_dict(p) for p in packs]


@app.get("/channels")
def channels(db: Session = Depends(get_db)):
    channels_list = db.query(Channel).all()
    return [channel_to_dict(c) for c in channels_list]


@app.post("/recharge")
def recharge(req: RechargeRequest, db: Session = Depends(get_db)):
    sub = (
        db.query(Subscriber)
        .filter(Subscriber.subscriber_id == req.subscriber_id)
        .first()
    )
    if not sub:
        raise HTTPException(status_code=404, detail="Subscriber not found")

    sub.balance += req.amount
    if sub.balance >= sub.monthly_charge:
        sub.status = "active"

    db.commit()
    db.refresh(sub)
    return subscriber_to_dict(sub)


@app.post("/chat")
def chat(req: ChatRequest):
    # TODO: Connect Dualsky Agentic RAG here
    reply = f"Thanks for your message: '{req.message}'. Our support team will get back to you shortly."
    if req.subscriber_id:
        reply = f"Hi subscriber {req.subscriber_id}! " + reply
    return {"reply": reply}