from flask import jsonify
from flask.views import View
from .middleware.register_request import validate as validate_register_request

class Register(View):
    @validate_register_request
    def dispatch_request(self):
        return jsonify({'name': 'register'})

class Login(View):
    pass

class RefreshToken(View):
    pass

class Logout(View):
    pass