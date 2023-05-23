from flask import Blueprint
from .view import AllProperties

pptys_bp = Blueprint('properties', __name__, url_prefix='/api/properties')

pptys_bp.add_url_rule('/', view_func=AllProperties.as_view('all_properties'))