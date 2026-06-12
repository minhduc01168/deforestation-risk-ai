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

class UserCreate(BaseModel):
    username: str
    password: str
    email: str
    full_name: Optional[str] = None
    organization: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str]
    organization: Optional[str]
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
