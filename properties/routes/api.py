from flask import Blueprint
from ..views.api import AllProperties

api_pptys_bp = Blueprint('api_properties', __name__, url_prefix='/api/properties')

api_pptys_bp.add_url_rule('/', view_func=AllProperties.as_view('all_properties'))