from flask import jsonify, request
from flask.views import View
from core import flask_bcrypt, app, db
from users.schemas.model import User
from ..middlewares.create_user import validate as validate_user_creation
from ..middlewares.login_user import validate as validate_user_login
from os.path import abspath, join
from core.helper.http_response import api_error
from core.database.storage import addUser


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
                if 'UNIQUE constraint failed:' in error_message:
                    return api_error(409, 'User already exists')
                return api_error(400, error_message)
        else:
            return '', 500


class Login(View):
    @validate_user_login()
    def dispatch_request(self):
        data = request.valid_data
        provided_username = data.get('username')
        user_email = data.get('email')
        user_pwd = data.get('password')
            
        if provided_username:
            user = db.session.execute(db.select(User).filter_by
                                      (username=provided_username)).scalar()
        elif user_email:
            user = db.session.execute(db.select(User).filter_by
                                      (email=user_email)).scalar()
        if user == None:
            return api_error(401, 'Incorrect username or email')
        else:
            pwd_found = flask_bcrypt.check_password_hash(user.password, user_pwd)

        if pwd_found:
            username = user.__dict__['username']
            return jsonify({'username': username})
        else:
            return api_error(401, 'Incorrect password')

class RefreshToken(View):
    pass

class Logout(View):
    pass
