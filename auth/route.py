from flask import Blueprint
from .view import Register

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

auth_bp.add_url_rule('/register', view_func=Register.as_view('register'), methods=['POST'])