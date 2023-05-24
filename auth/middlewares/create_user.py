from flask import request, abort
from functools import wraps
import jsonschema
from ..schemas.api.request import (create_user_schema, email_regex_pattern)

def validate():
    def wrapper(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                abort(415)
            
            user_data = request.get_json()
            if not len(user_data):
                abort(400, 'User Request object is empty')
            
            try:
                jsonschema.validate(user_data, create_user_schema)
                    
                request.data = user_data
                
                ''' Makes Request if validation is successful'''
                return func(*args, **kwargs)
            
            except jsonschema.ValidationError as e:
                if e.validator_value == email_regex_pattern:
                    abort(400, f"{e.instance} is not a valid email")
                else:
                    abort(400, e.message)
                    
        return wrapper
    return wrapper