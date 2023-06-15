from flask import jsonify, request 
from flask.views import View
from core import db
from ..schemas.model import Property
from core.helpers.http_response import api_data, api_error
from auth.middlewares.jwt import jwt_required

class AllProperties(View):
    def dispatch_request(self):
        """Returns all the properties in the database."""
        ppty_list = []
        pptys = db.session.execute(db.select(Property).order_by(Property.created_at)).scalars()
        for ppty in pptys:
            ppty_list.append(ppty.to_dict())

        if request.args.get('status'):
            status = request.args.get('status')
            return self.get_by_status(ppty_list, status)

        if request.args.get('type'):
            type = request.args.get('type')
            return self.get_by_type(ppty_list, type)

        return self.get(ppty_list)
        

    def get(self, ppty_list):
        return api_data(ppty_list)
    
    def get_by_status(self, ppty_list, status):
        return api_data([ppty for ppty in ppty_list if ppty['status'] == status])
    
    def get_by_type(self, ppty_list, type):
        if type == 'rent':
            return api_data([ppty for ppty in ppty_list if ppty['category'] == 'CAT_1' or ppty['category'] == 'CAT_3' or ppty['category'] == 'CAT_5'])
        
        if type == 'sale':
            return api_data([ppty for ppty in ppty_list if ppty['category'] == 'CAT_2' or ppty['category'] == 'CAT_4' or ppty['category'] == 'CAT_6'])
        

class SingleProperty(View):
    @jwt_required()
    def dispatch_request(self, ppty_id):
        ppty = db.session.execute(db.select(Property).filter_by(id=ppty_id)).scalar()
        
        
        if request.method == 'PUT' and request.args.get('status'):
            status = request.args.get('status')
            return self.update_status(ppty, status)
        
        if request.method == 'GET':
            return self.get(ppty)
        

    def get(self, ppty):
        if not ppty:
            return api_error(404, 'Property not found')

        return api_data(ppty.to_dict())
    
    
    def update_status(self, ppty, status):
        ppty.status = status
        db.session.commit()
        
        return api_data({'message': 'updated'})
    
         
