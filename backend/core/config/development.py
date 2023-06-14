from .default import DefaultConfig
from datetime import timedelta
class DevelopmentConfig(DefaultConfig):
    ENV = 'development'
    DEBUG = True
    
    SESSION_COOKIE_SECURE = False
   
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'

    JWT_ACCESS_SECRET_KEY = 'u8Ln-MV90nfTYy77Bpka0D7XbF9YUHi9dHnogFRHzx0'
    JWT_REFRESH_SECRET_KEY = 'Vh9bMIxjJSqHAmScimQ57J7MHk_hZ0qFJQ2epNyKo3Y'
    
    # JWT_ACCESS_SECRET_EXP = timedelta(seconds=45).total_seconds()
    # JWT_REFRESH_SECRET_EXP = timedelta(minutes=2).total_seconds()
    
    JWT_ACCESS_SECRET_EXP = timedelta(seconds=45).total_seconds()
    JWT_REFRESH_SECRET_EXP = timedelta(days=1).total_seconds()