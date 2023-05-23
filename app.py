from core import app
from properties.route import pptys_bp
from auth.route import auth_bp

app.register_blueprint(pptys_bp)
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    app.run()