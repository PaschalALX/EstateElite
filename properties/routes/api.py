from flask import Blueprint
from ..views.api import AllProperties, get_categories, SingleProperty

api_pptys_bp = Blueprint('api_properties', __name__, url_prefix='/api/properties')

api_pptys_bp.add_url_rule('/', view_func=AllProperties.as_view('all_properties'))
api_pptys_bp.add_url_rule('/<string:ppty_id>',
                          view_func=SingleProperty.as_view('single_property'))
api_pptys_bp.add_url_rule('/categories', view_func=get_categories)
