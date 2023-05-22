from .default import DefaultConfig
class TestingConfig(DefaultConfig):
    ENV = 'testing'
    TESTING = True