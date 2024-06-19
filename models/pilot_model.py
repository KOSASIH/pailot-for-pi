from datetime import datetime
from models.base import Base

class Pilot(Base):
    __tablename__ = "pilots"

    id = Base.Column(Base.Integer, primary_key=True)
    name = Base.Column(Base.String, nullable=False)
    email = Base.Column(Base.String, unique=True, nullable=False)
    created_at = Base.Column(Base.DateTime, default=datetime.utcnow)
    updated_at = Base.Column(Base.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Pilot(id={self.id}, name='{self.name}', email='{self.email}', created_at={self.created_at}, updated_at={self.updated_at})>"
