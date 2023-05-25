from flask import jsonify, request
from flask.views import View
from ..middlewares.create_user import validate as validate_user_creation
from ..middlewares.login_user import validate as validate_user_login

class Register(View):
    @validate_user_creation()
    def dispatch_request(self):
        return jsonify(request.valid_data)

class Login(View):
    @validate_user_login()
    def dispatch_request(self):
        return jsonify(request.valid_data)

class RefreshToken(View):
    pass

class Logout(View):
    pass