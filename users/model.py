"""This module defines the class User."""

from core import db
from uuid import uuid4
from datetime import datetime


class User(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'users'

    id = db.Column(db.String(36), unique=True, default=str(uuid4()),
                   primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False,
                           onupdate=datetime.now())

    properties = db.relationship('Property', back_populates='user',
                                 cascade='all, delete, delete-orphan')

    def __repr__(self):
        return f"({self.id}) {self.username}"