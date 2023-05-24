from flask import Blueprint
from ..views.api import Register, Login

api_auth_bp = Blueprint('api_auth', __name__, url_prefix='/api/auth')

api_auth_bp.add_url_rule('/register', view_func=Register.as_view('register'), methods=['POST'])
api_auth_bp.add_url_rule('/login', view_func=Login.as_view('login'), methods=['POST'])