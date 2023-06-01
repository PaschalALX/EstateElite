from flask import jsonify, request, make_response
from flask.views import View
from core import flask_bcrypt, app, db, jwt_cache
from users.schemas.model import User
from ..middlewares.create_user import validate as validate_user_creation
from ..middlewares.login_user import validate as validate_user_login
from core.helpers.http_response import api_error, api_data
from core.database.storage import addUser
from time import time
from uuid import uuid4
import jwt
from jwt.exceptions import InvalidSignatureError

class Register(View):
    @validate_user_creation()
    def dispatch_request(self):
        data = request.valid_data
        password = data.get('password')
            
        pwd_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')
        confirm_pwd_hash = flask_bcrypt.check_password_hash(pwd_hash, password)

        if confirm_pwd_hash is True:
            for key in data:
                if key == 'password':
                    data[key] = pwd_hash        
            try:
                addUser(data)
                return '', 201
            except Exception as e:
                error_message = str(e.args[0]) if e.args else "Unknown error occurred"
                if error_message.endswith('username'):
                    return api_error(409, f"Username '{data.get('username')}' is already taken.")
                if error_message.endswith('email'):
                    return api_error(409, f"Email address '{data.get('email')}' is already registered.")
                return api_error(400, error_message)
        else:
            return '', 500

class Login(View):
    @validate_user_login()
    def dispatch_request(self):
        data = request.valid_data
        provided_username = data.get('username')
        provided_email = data.get('email')
        provided_pwd = data.get('password')
            
        if provided_username:
            user = db.session.execute(db.select(User).filter_by
                                      (username=provided_username)).scalar()
        else:
            user = db.session.execute(db.select(User).filter_by
                                      (email=provided_email)).scalar()
        
        if not user:
            return api_error(401, 'Incorrect username or email')
        
        pwd_found = flask_bcrypt.check_password_hash(user.password, provided_pwd)

        if not pwd_found:
            return api_error(401, 'Incorrect password')

        jwt_access_exp = time() + app.config['JWT_ACCESS_SECRET_EXP']
        jwt_refresh_exp = time() + app.config['JWT_REFRESH_SECRET_EXP']

        jwt_access_token = jwt.encode({'user_id': user.id, 'exp': jwt_access_exp}, app.config['JWT_ACCESS_SECRET_KEY'])
        jwt_refresh_token = jwt.encode({'user_id': user.id, 'exp': jwt_refresh_exp}, app.config['JWT_REFRESH_SECRET_KEY'])
        
        response = make_response({'username':user.username,'jwt_access_token': jwt_access_token})
        response.set_cookie('jwt_refresh_token', jwt_refresh_token, expires=jwt_refresh_exp, path='/api')
        response.status_code = 200
        
        jwt_cache.put(user.id, 'jwt', app.config['JWT_REFRESH_SECRET_EXP'] / 60)    # jwt whitelist
        return response
        
            

class RefreshToken(View):
    def dispatch_request(self):
        jwt_refresh_token = request.cookies.get('jwt_refresh_token')
        
        if jwt_refresh_token:
            try:    
                payload = jwt.decode(jwt_refresh_token, app.config['JWT_REFRESH_SECRET_KEY'], 'HS256')
                jwt_access_exp = time() + app.config['JWT_ACCESS_SECRET_EXP']
                jwt_access_token = jwt.encode({'user_id': payload.get('user_id'), 'exp': jwt_access_exp}, app.config['JWT_ACCESS_SECRET_KEY'])
                return jsonify({'jwt_access_token': jwt_access_token})
            except InvalidSignatureError:
                return api_error(403, 'Invalid refresh token')
            
        return api_error(403, 'Expired refresh token')

class Logout(View):
    def dispatch_request(self):
        jwt_refresh_token = request.cookies.get('jwt_refresh_token')
        message = {'message': 'User logged out'}
        print('COOKIE', jwt_refresh_token)
        
        if jwt_refresh_token:
            try:
                payload = jwt.decode(jwt_refresh_token, app.config['JWT_REFRESH_SECRET_KEY'], 'HS256')
                if payload:
                    jwt_cache.pull(payload.get('user_id'))
                    response = make_response(message)
                    response.delete_cookie('jwt_refresh_token', '/api')
                    return response
            except InvalidSignatureError:
                return jsonify(message)
            
        return jsonify(message)