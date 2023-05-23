from flask import request, abort
import jsonschema
from ..json_schemas.request import (create_user_schema, email_regex_pattern)

def validate(func):
    def wrapper(*args, **kwargs):
        if not request.is_json:
            abort(415)
           
        auth_data = request.get_json()
        if not len(auth_data):
            abort(400, 'User Request object is empty')
        
        try:
            jsonschema.validate(auth_data, create_user_schema)
            
            if not auth_data['confirm_password'] == auth_data['password']:
                abort(400, 'Confirm Password does not match')
                
            request.data = auth_data
            
            ''' Makes Request if validation is successful'''
            return func(*args, **kwargs)
        
        except jsonschema.ValidationError as e:
            if e.validator_value == email_regex_pattern:
                abort(400, f"{e.instance} is not a valid email")
            else:
                abort(400, e.message)
                
    return wrapper