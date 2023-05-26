from core import app
from properties.routes.api import api_pptys_bp
from users.routes.api import api_users_bp
from auth.routes.api import api_auth_bp
from users.schemas.model import User
from properties.schemas.model import Property

''' Register API Blueprints'''
app.register_blueprint(api_pptys_bp)
app.register_blueprint(api_auth_bp)
app.register_blueprint(api_users_bp)



#with app.app_context():
    #ppty1 = Property(title='Television', category='vhvh', state='Anambra', city='Awka', address='10 Ifite road, Awka', description='50 inches LED Samsung TV', user_id='1cb8112b-8923-4617-a5c8-883fc60e6c97')
    #user2 = User(username='tessco', password='987654321', email='chiemelieeze@yahoo.com', is_admin=True)
    #user3 = User(username='terry', password='abcdefghi', email='terry@gmail.com', is_admin=True)

    #users = [user1, user2, user3]

    #db.session.add(ppty1)
    #db.session.commit()

if __name__ == '__main__':
    app.run()
