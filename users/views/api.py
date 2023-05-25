from flask.views import View
from ..schemas.model import User
from core import db
from flask import jsonify


class AllUsers(View):
    def dispatch_request(self):
        users_list = []
        users = db.session.execute(db.select(User).order_by(User.created_at)).scalars()

        for user in users:
            del user.__dict__['_sa_instance_state']
            del user.__dict__['password']
            users_list.append(user.__dict__)

        return jsonify(users_list)
