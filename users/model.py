"""This module defines the class User."""

from core import db
from uuid import uuid4
from datetime import datetime


class User(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'users'

    id = db.Column(db.String(36), unique=True, default=str(uuid4()),
                   primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False,
                           onupdate=datetime.now())
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    admin = db.Column(db.Boolean, default=False)
    properties = db.relationship('Property', backref='user',
                                 cascade='all, delete, delete-orphan')
