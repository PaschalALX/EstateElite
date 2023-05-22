from .default import DefaultConfig
class DevelopmentConfig(DefaultConfig):
    ENV = 'development'
    DEBUG = True
    
    SESSION_COOKIE_SECURE = False
    
    # DB_HOST = '127.0.0.1'
    # DB_PORT = 3306
    # DB_DATABASE = 'estateelite'
    # DB_USERNAME = 'root'
    # DB_PASSWORD = '12345678'

    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
