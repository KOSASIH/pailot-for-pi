from datetime import datetime
from models.base import Base

class Sensor(Base):
    __tablename__ = "sensors"

    id = Base.Column(Base.Integer, primary_key=True)
    name = Base.Column(Base.String, nullable=False)
    description = Base.Column(Base.String)
    created_at = Base.Column(Base.DateTime, default=datetime.utcnow)
    updated_at = Base.Column(Base.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Sensor(id={self.id}, name='{self.name}', description='{self.description}', created_at={self.created_at}, updated_at={self.updated_at})>"
