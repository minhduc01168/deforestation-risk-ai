import os
import hashlib
import uuid
import shutil
from fastapi import FastAPI, Depends, UploadFile, File, Form, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from geoalchemy2.elements import WKTElement
from geoalchemy2.shape import to_shape
from typing import List

import models, schemas
from database import engine, get_db

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Gia Lai Deforestation Web GIS API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

def hash_ip(ip: str) -> str:
    # Use a secret salt in production
    salt = "gialai_secret_salt_2026"
    return hashlib.sha256(f"{ip}{salt}".encode('utf-8')).hexdigest()

@app.post("/api/reports", response_model=schemas.ReportResponse)
async def create_report(
    request: Request,
    lat: float = Form(...),
    lon: float = Form(...),
    comment: str = Form(None),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    # Hash User IP
    client_ip = request.client.host if request.client else "127.0.0.1"
    user_ip_hash = hash_ip(client_ip)

    image_url = None
    if file:
        # Validate image extension
        ext = file.filename.split('.')[-1].lower()
        if ext not in ['jpg', 'jpeg', 'png']:
            raise HTTPException(status_code=400, detail="Only JPG or PNG images allowed")
        
        # Save file to disk
        filename = f"{uuid.uuid4().hex}.{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # URL for frontend to access
        image_url = f"/uploads/{filename}"

    # Create PostGIS point (Lon, Lat is standard for EWKT)
    pt_wkt = f"POINT({lon} {lat})"
    geom = WKTElement(pt_wkt, srid=4326)

    new_report = models.FieldReport(
        geom=geom,
        comment=comment,
        image_url=image_url,
        user_ip_hash=user_ip_hash
    )
    
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    
    return schemas.ReportResponse(
        id=new_report.id,
        lat=lat,
        lon=lon,
        comment=new_report.comment,
        image_url=new_report.image_url,
        created_at=new_report.created_at
    )

@app.get("/api/reports", response_model=List[schemas.ReportResponse])
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(models.FieldReport).all()
    res = []
    for r in reports:
        # Extract lat/lon from PostGIS geometry
        pt = to_shape(r.geom)
        res.append(schemas.ReportResponse(
            id=r.id,
            lat=pt.y,
            lon=pt.x,
            comment=r.comment,
            image_url=r.image_url,
            created_at=r.created_at
        ))
    return res

@app.get("/")
def read_root():
    return {"status": "Gia Lai Web GIS Backend is running!"}
