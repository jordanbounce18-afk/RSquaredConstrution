from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="R2 Construction API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============ Models ============
class EstimateRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    project_type: str
    budget: Optional[str] = None
    timeline: Optional[str] = None
    address: Optional[str] = None
    message: str
    status: str = "new"  # new | reviewed | contacted | closed
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class EstimateCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=5, max_length=40)
    project_type: str = Field(..., min_length=1)
    budget: Optional[str] = None
    timeline: Optional[str] = None
    address: Optional[str] = None
    message: str = Field(..., min_length=1, max_length=4000)


class EstimateStatusUpdate(BaseModel):
    status: str


# ============ Routes ============
@api_router.get("/")
async def root():
    return {"message": "R2 Construction API", "status": "ok"}


@api_router.post("/estimates", response_model=EstimateRequest, status_code=201)
async def create_estimate(payload: EstimateCreate):
    estimate = EstimateRequest(**payload.model_dump())
    doc = estimate.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.estimates.insert_one(doc)
    return estimate


@api_router.get("/estimates", response_model=List[EstimateRequest])
async def list_estimates():
    cursor = db.estimates.find({}, {"_id": 0}).sort("created_at", -1)
    items = await cursor.to_list(1000)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.get("/estimates/{estimate_id}", response_model=EstimateRequest)
async def get_estimate(estimate_id: str):
    doc = await db.estimates.find_one({"id": estimate_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Estimate not found")
    if isinstance(doc.get('created_at'), str):
        doc['created_at'] = datetime.fromisoformat(doc['created_at'])
    return doc


@api_router.patch("/estimates/{estimate_id}", response_model=EstimateRequest)
async def update_estimate_status(estimate_id: str, payload: EstimateStatusUpdate):
    allowed = {"new", "reviewed", "contacted", "closed"}
    if payload.status not in allowed:
        raise HTTPException(status_code=400, detail=f"Invalid status. Allowed: {sorted(allowed)}")
    result = await db.estimates.update_one(
        {"id": estimate_id},
        {"$set": {"status": payload.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Estimate not found")
    doc = await db.estimates.find_one({"id": estimate_id}, {"_id": 0})
    if isinstance(doc.get('created_at'), str):
        doc['created_at'] = datetime.fromisoformat(doc['created_at'])
    return doc


@api_router.delete("/estimates/{estimate_id}", status_code=204)
async def delete_estimate(estimate_id: str):
    result = await db.estimates.delete_one({"id": estimate_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Estimate not found")
    return None


@api_router.get("/estimates/stats/summary")
async def estimates_summary():
    total = await db.estimates.count_documents({})
    new = await db.estimates.count_documents({"status": "new"})
    reviewed = await db.estimates.count_documents({"status": "reviewed"})
    contacted = await db.estimates.count_documents({"status": "contacted"})
    closed = await db.estimates.count_documents({"status": "closed"})
    return {
        "total": total,
        "new": new,
        "reviewed": reviewed,
        "contacted": contacted,
        "closed": closed,
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
