from flask import Blueprint
from .view import Register, Login

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

auth_bp.add_url_rule('/register', view_func=Register.as_view('register'), methods=['POST'])
auth_bp.add_url_rule('/login', view_func=Login.as_view('login'), methods=['POST'])