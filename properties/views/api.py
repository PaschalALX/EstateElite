from flask import jsonify
from flask.views import View
from core import db
from ..schemas.model import Property

class AllProperties(View):
    def dispatch_request(self):
        ppty_list = []
        pptys = db.session.execute(db.select(Property).order_by(Property.created_at)).scalars()
        for ppty in pptys:
            del ppty.__dict__['_sa_instance_state']
            ppty.__dict__['created_at'] = ppty.__dict__['created_at'].isoformat()
            ppty.__dict__['updated_at'] = ppty.__dict__['updated_at'].isoformat()
            ppty_list.append(ppty.__dict__)
    
        return jsonify(ppty_list)