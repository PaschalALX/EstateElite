from core import app, db
from properties.schemas.model import Property
from properties.routes.api import api_pptys_bp
from users.routes.api import api_users_bp
from auth.routes.api import api_auth_bp

''' Register API Blueprints'''
app.register_blueprint(api_pptys_bp)
app.register_blueprint(api_auth_bp)
app.register_blueprint(api_users_bp)

from auth.middlewares.jwt import jwt_required
@app.route('/api/protected')
@jwt_required()
def protected():
    return {'message': 'This is a protected route'}

#with app.app_context():
    #ppty1 = Property(title='Keke', category=2, state='Anambra', city='Awka', address='10 Ifite road, Awka', description='Keke', user_id='96971367-36f1-487b-95ad-3e6fdcf814cc', price=400000)
    #user2 = User(username='tessco', password='987654321', email='chiemelieeze@yahoo.com', is_admin=True)
    #user3 = User(username='terry', password='abcdefghi', email='terry@gmail.com', is_admin=True)

    #users = [user1, user2, user3]

    #db.session.add(ppty1)
    #db.session.commit()

if __name__ == '__main__':
    app.run()
