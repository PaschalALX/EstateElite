from flask import request, abort
import jsonschema
from ..json_schemas.request import (login_user_schema, 
                                  email_regex_pattern)
import re

def validate(func):
    def wrapper(*args, **kwargs):
        if not request.is_json:
            abort(415)
           
        auth_data = request.get_json()
        if not len(auth_data):
            abort(400, 'User Request object is empty')
        
        try:
            jsonschema.validate(auth_data, login_user_schema)
            
            
            if re.match(email_regex_pattern, auth_data['username_or_email']):
                request.with_email = True
                request.with_username = False
            else:
                request.with_username = True
                request.with_email = False    

            request.data = auth_data
            
            ''' Makes Request if validation is successful'''
            return func(*args, **kwargs)  
        except jsonschema.ValidationError as e:
            abort(400, e.message)
          
    return wrapper