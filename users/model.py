from core import db
from uuid import uuid4

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(), unique=True, default=str(uuid4()), primary_key=True)
    name = db.Column(db.String())