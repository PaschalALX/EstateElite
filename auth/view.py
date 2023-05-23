from flask import jsonify, request
from flask.views import View
from .middleware.create_user import validate as validate_user_creation
from .middleware.login_user import validate as validate_user_login

class Register(View):
    @validate_user_creation
    def dispatch_request(self):
        return jsonify({'name': 'register'})

class Login(View):
    @validate_user_login
    def dispatch_request(self):
        res = 'EMAIL' if request.data.get('email') else 'USERNAME'
        return jsonify({'name': res})

class RefreshToken(View):
    pass

class Logout(View):
    pass