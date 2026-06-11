from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReportCreate(BaseModel):
    lat: float
    lon: float
    comment: Optional[str] = None

class ReportResponse(BaseModel):
    id: int
    lat: float
    lon: float
    comment: Optional[str]
    image_url: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True
