# api_key.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class ApiKey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    key = db.Column(db.String(100), unique=True, nullable=False)
    user = relationship('User', backref='api_key', lazy=True)

    def __repr__(self):
        return f'<ApiKey {self.key}>'
