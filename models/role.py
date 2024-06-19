# role.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    users = relationship('User', backref='role', lazy=True)

    def __repr__(self):
        return f'<Role {self.name}>'
