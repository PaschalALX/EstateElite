from dotenv import load_dotenv
from os import getenv
from datetime import timedelta

load_dotenv()

class DefaultConfig():
    ENV = 'production'
    DEBUG = False
    TESTING = False
    SESSION_COOKIE_SECURE = True

    DB_HOST = getenv('DB_HOST', None)
    DB_PORT = getenv('DB_PORT', None)
    DB_DATABASE = getenv('DB_DATABASE', None)
    DB_USERNAME = getenv('DB_USERNAME', None)
    DB_PASSWORD = getenv('DB_PASSWORD', None)

    SQLALCHEMY_TRACK_MODIFICATION = False

    JWT_ACCESS_SECRET_KEY = getenv('JWT_ACCESS_SECRET_KEY')
    JWT_REFRESH_SECRET_KEY = getenv('JWT_REFRESH_SECRET_KEY')
    
    JWT_ACCESS_SECRET_EXP = timedelta(minutes=10).total_seconds()
    JWT_REFRESH_SECRET_EXP = timedelta(days=1).total_seconds()
    
    # @property
    # def SQLALCHEMY_DATABASE_URI(self):
    #     return "mysql+pymysql//{}:{}@{}:{}/{}".format(
    #             self.DB_USERNAME, self.DB_PASSWORD, self.DB_HOST,
    #             self.DB_PORT, self.DB_DATABASE)

    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{getenv('DB_USERNAME', None)}:{getenv('DB_PASSWORD', None)}@{getenv('DB_HOST', None)}:{getenv('DB_PORT', None)}/{getenv('DB_DATABASE', None)}"