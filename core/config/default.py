from dotenv import load_dotenv
from os import getenv

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
    
    @property
    def SQLALCHEMY_DATABASE_URI(self):
        return f"mysql+pymysql//{self.DB_USERNAME}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_DATABASE}"