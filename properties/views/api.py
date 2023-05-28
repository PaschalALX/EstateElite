from flask import jsonify
from flask.views import View
from core import db
from ..schemas.model import Property
from ..schemas.request_body import category_dict
from core.helpers.http_response import api_data, api_error
import arrow


class AllProperties(View):
    def dispatch_request(self):
        """Returns all the properties in the database."""
        ppty_list = []
        pptys = db.session.execute(db.select(Property).order_by(Property.created_at)).scalars()
        for ppty in pptys:
            ppty_list.append(ppty.to_dict())
    
        return api_data(ppty_list)


def get_categories():
    return api_data(category_dict)


class SingleProperty(View):
    def dispatch_request(self, ppty_id):
        ppty = db.session.execute(db.select(Property).filter_by(id=ppty_id)).scalar()

        if not ppty:
            return api_error(404, 'Property not found')

        return api_data(ppty.to_dict())
