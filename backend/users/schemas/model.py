"""This module defines the class User."""
from core.schemas.base_model import BaseModel
from core import db
from uuid import uuid4
from datetime import datetime
import arrow


class User(db.Model, BaseModel):
    """Defines the attributes of the class."""

    __tablename__ = 'users'

    username = db.Column(db.String(36), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    properties = db.relationship('Property', back_populates='user',
                                 cascade='all, delete, delete-orphan')

