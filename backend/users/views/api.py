from flask.views import View
from flask import make_response
from ..schemas.model import User
from core.helpers.http_response import api_data, api_error
from properties.schemas.model import Property, Image
from flask import request
from core import db
from ..middleware.property import validate as validate_new_ppty
from auth.middlewares.jwt import jwt_required
from core import jwt_cache
from json import loads
from core.services.process_image import store_base64_img, delete_image

class AllUsers(View):
    """Returns all the users in the database."""
    def dispatch_request(self):
        users_list = []
        users = db.session.execute(db.select(User).order_by(User.created_at)).scalars()

        for user in users:
            users_list.append(user.to_dict())

        return api_data(users_list)


class SingleUser(View):
    @jwt_required()
    def dispatch_request(self, user_id):
        """
        If user_id, it returns or deletes the user from the database.
        Otherwise, it returns 'User not found'.
        """
        user = db.session.execute(db.select(User).filter_by(id=user_id)).scalar()

        if not user:
            return api_error(404, 'User not found')

        if request.method == 'GET':
            return api_data(user.to_dict())

        if request.method == 'DELETE':
            
            print('HELLO')
            user_images = db.session.execute(db.select(Image).filter_by(user_id=user_id)).scalars()
            for image in user_images:
                delete_image(image.path)
             
            db.session.delete(user)
            db.session.commit()
            jwt_cache.pull(user_id)
            response = make_response({'message': 'User Deleted'})          
            response.delete_cookie('jwt_refresh_token', '/api')
            return response, 204
           


class UserProperties(View):
    @jwt_required()
    @validate_new_ppty()
    def dispatch_request(self, id):
        
        if request.method == 'GET':
            """Returns all the properties of the user depending on the id of the user."""
            user_ppty_list = list()
            user_pptys = db.session.execute(db.select(Property).
                    filter_by(user_id=id)).scalars()

            for user_ppty in user_pptys:
                user_ppty_list.append(user_ppty.to_dict())

            return api_data(user_ppty_list)
        
        if request.method == 'POST':
            data = loads(request.data)
            images = data.pop('images')
            new_ppty = Property(**data)
            db.session.add(new_ppty)     
            db.session.commit()
            
            ppty_images = []
            for image in images:
                image_path = store_base64_img(image)
                ppty_images.append(Image(path=image_path, user_id=data['user_id']))

            new_ppty.images = ppty_images
            db.session.add(new_ppty)
            db.session.commit()
            
            return api_data({'message':'saved'}) 


class UserProperty(View):
    @jwt_required()
    def dispatch_request(self, user_id, ppty_id):
        """
        Returns or deletes one requested property of a user depending
        on the user_id and the property_id.
        """
        user_ppty = db.session.execute(
            db.select(Property).filter_by(user_id=user_id, id=ppty_id)).scalar()

        if user_ppty is None:
            return api_error(404, 'Property not found')

        if request.method == 'GET':
            return api_data(user_ppty.to_dict())

        if request.method == 'DELETE':
            for image in user_ppty.images:
                delete_image(image.path)

            db.session.delete(user_ppty)
            db.session.commit()
            return api_data({'message': 'Property Deleted'}, 204)
