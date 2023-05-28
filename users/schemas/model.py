"""This module defines the class User."""

from core import db
from uuid import uuid4
from datetime import datetime
import arrow


class User(db.Model):
    """Defines the attributes of the class."""

    __tablename__ = 'users'

    id = db.Column(db.String(36), unique=True, default=lambda: str(uuid4()),
                   primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.utcnow(), nullable=False,
                           onupdate=lambda: datetime.utcnow())

    properties = db.relationship('Property', back_populates='user',
                                 cascade='all, delete, delete-orphan')

    def __repr__(self):
        return f"({self.id}) {self.username}"

    def to_dict(self):
        """Returns a dictionary representation of each instance of class."""

        obj = {}

        for key, value in self.__dict__.items():
            if key != '_sa_instance_state':
                obj[key] = value
                if key == 'created_at' or key == 'updated_at':
                    obj[key] = arrow.get(value).humanize()
                if key == 'username':
                    obj[key] = value.title()

        if 'password' in obj.keys():
            del obj['password']

        return obj
