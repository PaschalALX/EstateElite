from flask import Blueprint
from ..views.api import AllUsers, UserProperties, UserProperty

api_users_bp = Blueprint('users', __name__, url_prefix='/api/users')

api_users_bp.add_url_rule('/', view_func=AllUsers.as_view('all_users'))
api_users_bp.add_url_rule('/<string:id>/properties',
                          view_func=UserProperties.as_view('user_properties'), methods=['GET', 'POST'])
api_users_bp.add_url_rule('/<string:user_id>/properties/<string:ppty_id>',
                          view_func=UserProperty.as_view('user_property'),
                          methods=['GET', 'DELETE'])
