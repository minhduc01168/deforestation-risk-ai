from sqlalchemy import Column, Integer, String, Text, DateTime
from geoalchemy2 import Geometry
from sqlalchemy.sql import func
from database import Base

class FieldReport(Base):
    __tablename__ = "field_reports"

    id = Column(Integer, primary_key=True, index=True)
    # 4326 is the standard WGS84 EPSG code for Lat/Lon
    geom = Column(Geometry(geometry_type='POINT', srid=4326), nullable=False)
    comment = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    user_ip_hash = Column(String, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
