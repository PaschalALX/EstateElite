"""This module defines the class Property."""

from core import db
from uuid import uuid4
from datetime import datetime


class Property(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'properties'

    id = db.Column(db.String(36), unique=True, default=str(uuid4()),
                   primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    featured = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.String, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False,
                           onupdate=datetime.now())
    
    user = db.relationship('User', back_populates='properties')
    images = db.relationship('Image', back_populates='property',
                             cascade='all, delete, delete-orphan')

    def __repr__(self):
        return f"({self.id}) {self.title}"
    
class Image(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'images'
    
    id = db.Column(db.String(36), unique=True, default=str(uuid4()),
                   primary_key=True)
    property_id = db.Column(db.String, db.ForeignKey('properties.id'))
    path = db.Column(db.String, default=None)

    property = db.relationship('Property', back_populates='images')
    
    def __repr__(self):
        return f"({self.id}) {self.path}"