from .default import DefaultConfig
class DevelopmentConfig(DefaultConfig):
    ENV = 'development'
    DEBUG = True
    DB_DRIVER = 'sqlite'
    DB_URL = 'tmp/dev.db'
    # DB_HOST = '127.0.0.1'
    # DB_PORT = 3306
    # DB_DATABASE = 'estateelite'
    # DB_USERNAME = 'root'
    # DB_PASSWORD = '12345678'

    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
