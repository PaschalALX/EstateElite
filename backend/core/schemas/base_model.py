from core import db
from datetime import datetime
from uuid import uuid4

class BaseModel():
    id = db.Column(db.String(36), unique=True, default=lambda: str(uuid4()),
                   primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False,
                           onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"({self.id}) {self.username}"

    def to_dict(self):
        """Returns a dictionary representation of each instance of class."""

        obj = {}

        for key, value in self.__dict__.items():
            if key != '_sa_instance_state' and key != 'password':
                obj[key] = value
                if key == 'username':
                    obj[key] = value.title()

        return obj