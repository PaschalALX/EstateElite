from os.path import join, abspath
from flask import Flask
from core.config import load_config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flasgger import Swagger
from flask_bcrypt import Bcrypt

SWAGGER_FILE_PATH = join(abspath('.'), 'core', 'swagger.yaml')

config = load_config()
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
Swagger(app, template_file=SWAGGER_FILE_PATH)
flask_bcrypt = Bcrypt(app)

import core.database.models_register
