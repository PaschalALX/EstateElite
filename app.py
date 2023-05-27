from core import app
from properties.routes.api import api_pptys_bp
from users.routes.api import api_users_bp
from auth.routes.api import api_auth_bp

''' Register API Blueprints'''
app.register_blueprint(api_pptys_bp)
app.register_blueprint(api_auth_bp)
app.register_blueprint(api_users_bp)

if __name__ == '__main__':
    app.run()
