from flask import request, abort, jsonify
from functools import wraps
from ..schemas.request_body import NewUserSchema, ValidationError
from core.helpers.http_response import api_error
from core.helpers.parsers import major_parser

def validate():
    def wrapper(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                return api_error()
        
            try:   
                new_user_data = request.json    
                new_user_data = major_parser(new_user_data)   
                new_user_schema = NewUserSchema()
                valid_data = new_user_schema.load(new_user_data)
                request.valid_data = valid_data
                
                ''' Makes Request if validation is successful'''
                return func(*args, **kwargs)
            
            except ValidationError as e:
                err_dict = {k: v[0] for k, v in e.messages.items()}
                print(err_dict)
                return api_error(400, err_dict)
                               
        return wrapper
    return wrapper