"""This module defines the class Property."""

from core import db
from uuid import uuid4
from datetime import datetime


class Property(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'properties'

    id = db.Column(db.String(36), unique=True, default=str(uuid4()),
                   primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False,
                           onupdate=datetime.now())
    name = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), unique=True)
    images = db.relationship('Image', backref='property',
                             cascade='all, delete, delete-orphan')


class Image(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'images'
    
    id = db.Column(db.String(36), unique=True, default=str(uuid4()),
                   primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False,
                           onupdate=datetime.now())
    property_id = db.Column(db.String, db.ForeignKey('properties.id'), unique=True)
