from dotenv import load_dotenv
from os import getenv
load_dotenv()

def load_config(ENV=getenv('ENV', 'development')):
    ''' load config '''
    try:
        if ENV == 'production':
            from .production import ProductionConfig
            return ProductionConfig
        if ENV == 'testing':
            from .testing import TestingConfig
            return TestingConfig
        else:
            from .development import DevelopmentConfig
            return DevelopmentConfig
    except ImportError:
        from .default import DefaultConfig
        return DefaultConfig