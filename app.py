from core import app
from properties.routes.api import api_pptys_bp
from auth.routes.api import api_auth_bp
from core.errorhander.request import (resource_not_found, 
                                      unsupported_media_type,
                                      bad_request)
''' Register API Blueprints'''
app.register_blueprint(api_pptys_bp)
app.register_blueprint(api_auth_bp)

''' Register Error Handlers'''
app.register_error_handler(400, bad_request)
app.register_error_handler(404, resource_not_found)
app.register_error_handler(415, unsupported_media_type)


if __name__ == '__main__':
    app.run()