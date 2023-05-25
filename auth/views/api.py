from flask import jsonify, request
from flask.views import View
from core import flask_bcrypt, app, db
from users.schemas.model import User
from ..middlewares.create_user import validate as validate_user_creation
from ..middlewares.login_user import validate as validate_user_login
from flasgger import swag_from 
from os.path import abspath, join

REGISTER_SPECS_PATH = join(abspath('.'), 'auth', 'views', 'specs', 'register.yml')
class Register(View):
    @swag_from(REGISTER_SPECS_PATH)
    @validate_user_creation()
    def dispatch_request(self):
        if request.method == 'POST':
            data = request.valid_data
            password = data.get('password')
            username = data.get('username')
            
            pwd_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')
            confirm_pwd_hash = flask_bcrypt.check_password_hash(pwd_hash, password)

            if confirm_pwd_hash is True:
                for key, value in data.items():
                    if key == 'password':
                        data[key] = pwd_hash
                    if key == 'username':
                        if value == '' or value.isspace() is True:
                            return jsonify({'Error': 'Unsupported username'}), 400
                
                with app.app_context():
                    try:
                        user = User(**data)
                        db.session.add(user)
                        db.session.commit()
                        return '', 201
                    except Exception as e:
                        error_message = str(e.args[0]) if e.args else "Unknown error occurred"
                        if 'UNIQUE constraint failed: users.username' in error_message:
                            return jsonify({'Error': 'Username has already been chosen'}), 409
                        if 'UNIQUE constraint failed: users.email' in error_message:
                            return jsonify({'Error': 'Email has already been chosen'}), 409
                        return jsonify({'Error': error_message}), 400
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
