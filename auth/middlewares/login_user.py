from flask import request, abort
from functools import wraps
import jsonschema
from ..schemas.api.request import (login_user_schema, 
                                  email_regex_pattern)
import re

def validate():
    def wrapper(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                abort(415)
            
            auth_data = request.get_json()
            if not len(auth_data):
                abort(400, 'User Request object is empty')
            
            try:
                jsonschema.validate(auth_data, login_user_schema)
                
                
                if re.match(email_regex_pattern, auth_data['username_or_email']):
                    auth_data['email'] = auth_data['username_or_email']
                else:
                    auth_data['username'] = auth_data['username_or_email'] 

                request.data = auth_data
                ''' Makes Request if validation is successful'''
                return func(*args, **kwargs)  
            except jsonschema.ValidationError as e:
                abort(400, e.message)
            
        return wrapper
    return wrapper