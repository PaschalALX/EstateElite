"""This module defines the class Property."""

from core import db
from uuid import uuid4
from datetime import datetime


class Property(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'properties'

    id = db.Column(db.String(36), unique=True, default=lambda: str(uuid4()),
                   primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(256), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(10), default='pending')
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False,
                           onupdate=datetime.utcnow)
    
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
                if key == 'username':
                    obj[key] = value.title()

        return obj


class Image(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'images'
    
    id = db.Column(db.String(36), unique=True, default=lambda: str(uuid4()),
                   primary_key=True)
    property_id = db.Column(db.String(36), db.ForeignKey('properties.id'))
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
                if key == 'username':
                    obj[key] = value.title()

        return obj
