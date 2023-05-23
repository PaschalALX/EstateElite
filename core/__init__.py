from flask import Flask
from core.config import load_config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

config = load_config()
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import core.database.models_register
