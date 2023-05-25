from flask import jsonify, request
from flask.views import View
from ..middlewares.create_user import validate as validate_user_creation
from ..middlewares.login_user import validate as validate_user_login
from flasgger import swag_from 
from os.path import abspath, join

REGISTER_SPECS_PATH = join(abspath('.'), 'auth', 'views', 'specs', 'register.yml')
class Register(View):
    @swag_from(REGISTER_SPECS_PATH)
    @validate_user_creation()
    def dispatch_request(self):
        print(abspath('.'))
        return jsonify(request.valid_data)

class Login(View):
    @validate_user_login()
    def dispatch_request(self):
        return jsonify(request.valid_data)

class RefreshToken(View):
    pass

class Logout(View):
    pass