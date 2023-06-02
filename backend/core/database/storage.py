"""This module contains functions for querying the database"""

from core import db
from users.schemas.model import User
from properties.schemas.model import Property, Image

def addUser(data):
    """Adds a new user to the database"""

    user = User(**data)
    db.session.add(user)
    db.session.commit()    
