from flask.views import View
from ..schemas.model import User
from core.helpers.http_response import api_data, api_error
from properties.schemas.model import Property
from flask import request
from core import db
import arrow


class AllUsers(View):
    """Returns all the users in the database."""
    def dispatch_request(self):
        users_list = []
        users = db.session.execute(db.select(User).order_by(User.created_at)).scalars()

        for user in users:
            del user.__dict__['_sa_instance_state']
            del user.__dict__['password']
            user.__dict__['created_at'] = arrow.get(user.created_at).humanize()
            user.__dict__['updated_at'] = arrow.get(user.updated_at).humanize()
            users_list.append(user.__dict__)

        return api_data(users_list)


class UserProperties(View):
    def dispatch_request(self, id):
        """Returns all the properties of the user depending on the id of the user."""
        user_ppty_list = list()
        user_pptys = db.session.execute(db.select(Property).
                                        filter_by(user_id=id)).scalars()

        for user_ppty in user_pptys:
            del user_ppty.__dict__['_sa_instance_state']
            user_ppty.__dict__['created_at'] = arrow.get(user_ppty.created_at).humanize()
            user_ppty.__dict__['updated_at'] = arrow.get(user_ppty.updated_at).humanize()
            user_ppty_list.append(user_ppty.__dict__)

        return api_data(user_ppty_list)

class UserProperty(View):
    def dispatch_request(self, user_id, ppty_id):
        """
        Returns one requested property of a user depending on the user_id
        and the property_id.
        """
        user_ppty = db.session.execute(db.select(Property).
                                       filter_by(user_id=user_id, id=ppty_id)).scalar()

        if user_ppty is None:
            return api_error(404, 'Property not found')

        if request.method == 'GET':
            del user_ppty.__dict__['_sa_instance_state']
            user_ppty.__dict__['created_at'] = arrow.get(user_ppty.
                                                         created_at).humanize()
            user_ppty.__dict__['updated_at'] = arrow.get(user_ppty.
                                                         updated_at).humanize()
                
            return api_data(user_ppty.__dict__)
        elif request.method == 'DELETE':
            db.session.delete(user_ppty)
            db.session.commit()
            return api_data('', 204)
