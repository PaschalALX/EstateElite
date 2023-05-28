from flask import jsonify
from flask.views import View
from core import db
from ..schemas.model import Property
from ..schemas.request_body import category_dict
from core.helpers.http_response import api_data
import arrow


class AllProperties(View):
    def dispatch_request(self):
        """Returns all the properties in the database."""
        ppty_list = []
        pptys = db.session.execute(db.select(Property).order_by(Property.created_at)).scalars()
        for ppty in pptys:
            del ppty.__dict__['_sa_instance_state']
            ppty.__dict__['created_at'] = arrow.get(ppty.created_at).humanize()
            ppty.__dict__['updated_at'] = arrow.get(ppty.updated_at).humanize()
            ppty_list.append(ppty.__dict__)
    
        return api_data(ppty_list)


def get_categories():
    return api_data(category_dict)


class SingleProperty(View):
    def dispatch_request(self, ppty_id):
        ppty = db.session.execute(db.select(Property).filter_by(id=ppty_id)).scalar()

        if ppty:
            del ppty.__dict__['_sa_instance_state']
            ppty.__dict__['created_at'] = arrow.get(ppty.created_at).humanize()
            ppty.__dict__['updated_at'] = arrow.get(ppty.updated_at).humanize()
            return api_data(ppty.__dict__)
        else:
            ppty = []
            return api_data(ppty)
