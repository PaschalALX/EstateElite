from core import app
from properties.routes.api import api_pptys_bp
from users.routes.api import api_users_bp
from auth.routes.api import api_auth_bp
from core import db, app
from users.schemas.model import User
from core.errorhander.http_request import (resource_not_found, bad_request)
''' Register API Blueprints'''
app.register_blueprint(api_pptys_bp)
app.register_blueprint(api_auth_bp)
app.register_blueprint(api_users_bp)

''' Register Error Handlers'''
app.register_error_handler(400, bad_request)
app.register_error_handler(404, resource_not_found)

"""
with app.app_context():
    user1 = User(username='pasmac', password='123456789', email='paschal01@gmail.com', is_admin=True)
    user2 = User(username='tessco', password='987654321', email='chiemelieeze@yahoo.com', is_admin=True)
    user3 = User(username='terry', password='abcdefghi', email='terry@gmail.com', is_admin=True)

    users = [user1, user2, user3]

    db.session.add_all(users)
    db.session.commit()
"""
if __name__ == '__main__':
    app.run()
