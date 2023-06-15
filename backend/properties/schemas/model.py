"""This module defines the class Property."""
from core.schemas.base_model import BaseModel
from core import db
from uuid import uuid4
from datetime import datetime


class Property(db.Model, BaseModel):
    """Defines the attributes of the class."""

    __tablename__ = 'properties'

    title = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(256), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(10), default='pending')
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    
    user = db.relationship('User', back_populates='properties')
    images = db.relationship('Image', back_populates='property',
                             cascade='all, delete, delete-orphan')

    def __repr__(self):
        return f"({self.id}) {self.title}"

    def to_dict(self):
        """Returns a dictionary representation of each instance of class."""

        obj = {}

        for key, value in self.__dict__.items():
            if key != '_sa_instance_state':
                obj[key] = value
        obj['images'] = []
        for image in self.images:
            obj['images'].append(image.path)
        obj['username'] = self.user.username
        return obj


class Image(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'images'
    
    id = db.Column(db.String(36), unique=True, default=lambda: str(uuid4()),
                   primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    property_id = db.Column(db.String(36), db.ForeignKey('properties.id'))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    path = db.Column(db.String(255), default=None)

    property = db.relationship('Property', back_populates='images')
    
    def __repr__(self):
        return f"({self.id}) {self.path}"

    def to_dict(self):
        """Returns a dictionary representation of each instance of class."""

        obj = {}

        for key, value in self.__dict__.items():
            if key != '_sa_instance_state':
                obj[key] = value
                
        return obj
