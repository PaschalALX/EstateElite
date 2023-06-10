from .default import DefaultConfig
from datetime import timedelta
class DevelopmentConfig(DefaultConfig):
    ENV = 'development'
    DEBUG = True
    
    SESSION_COOKIE_SECURE = False
   
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'

    JWT_ACCESS_SECRET_KEY = 'RAttVuOtGVujyWEXjbdM4kmysXfjigb4DL6BsD9wsV0wrj9jZc3lNg'
    JWT_REFRESH_SECRET_KEY = 'RBhqIxmW6yW0N6HIEy3Atuesd00Ew3Fehf7ahRpVUexs91GQI0CeSg'
    
    JWT_ACCESS_SECRET_EXP = timedelta(seconds=45).total_seconds()
    JWT_REFRESH_SECRET_EXP = timedelta(minutes=2).total_seconds()
    