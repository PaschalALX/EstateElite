from flask.views import View
from ..schemas.model import User
from properties.schemas.model import Property
from core import db
from flask import jsonify


class AllUsers(View):
    """Returns all the users in the database."""
    def dispatch_request(self):
        users_list = []
        users = db.session.execute(db.select(User).order_by(User.created_at)).scalars()

        for user in users:
            del user.__dict__['_sa_instance_state']
            del user.__dict__['password']
            users_list.append(user.__dict__)

        return jsonify(users_list)


class UserProperty(View):
    def dispatch_request(self, id):
        """Returns all the properties of the user depending on the id."""
        user_ppty_list = list()
        user_pptys = db.session.execute(db.select(Property).
                                        filter_by(user_id=id)).scalars()

        for user_ppty in user_pptys:
            del user_ppty.__dict__['_sa_instance_state']
            user_ppty_list.append(user_ppty.__dict__)

        return jsonify(user_ppty_list)
