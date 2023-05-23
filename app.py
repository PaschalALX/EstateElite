from core import app
from properties.route import pptys_bp
from auth.route import auth_bp
from core.errorhander.request import (resource_not_found, 
                                      unsupported_media_type,
                                      bad_request)

app.url_map.strict_slashes = False
app.register_blueprint(pptys_bp)
app.register_blueprint(auth_bp)

app.register_error_handler(400, bad_request)
app.register_error_handler(404, resource_not_found)
app.register_error_handler(415, unsupported_media_type)


if __name__ == '__main__':
    app.run()