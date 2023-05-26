from flask import jsonify, request
from flask.views import View
from core import flask_bcrypt, app, db
from users.schemas.model import User
from ..middlewares.create_user import validate as validate_user_creation
from ..middlewares.login_user import validate as validate_user_login
from os.path import abspath, join
from core.helper.http_response import api_error

class Register(View):
    @validate_user_creation()
    def dispatch_request(self):
        if request.method == 'POST':
            data = request.valid_data
            password = data.get('password')
            
            pwd_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')
            confirm_pwd_hash = flask_bcrypt.check_password_hash(pwd_hash, password)

            if confirm_pwd_hash is True:
                for key in data:
                    if key == 'password':
                        data[key] = pwd_hash
        
                with app.app_context():
                    try:
                        user = User(**data)
                        db.session.add(user)
                        db.session.commit()
                        return '', 201
                    except Exception as e:
                        error_message = str(e.args[0]) if e.args else "Unknown error occurred"
                        if 'UNIQUE constraint failed: users.username' in error_message:
                            return api_error(409, 'Username already exists')
                        if 'UNIQUE constraint failed: users.email' in error_message:
                            return api_error(409, 'Email already exists')
                        return api_error(400, error_message)
            else:
                return '', 500

class Login(View):
    @validate_user_login()
    def dispatch_request(self):
        return jsonify(request.valid_data)

class RefreshToken(View):
    pass

class Logout(View):
    pass
