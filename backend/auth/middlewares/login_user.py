from flask import request, abort, jsonify
from functools import wraps
from ..schemas.request_body import LoginUserSchema, ValidationError
from core.helpers.http_response import api_error
from core.helpers.http_response import api_error
from core.helpers.parsers import strip_excess_spaces, strip_html_tags

def validate():
    def wrapper(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                return api_error()
            
            try:
                login_user_data = request.json
                login_user_data = strip_excess_spaces(login_user_data)   
                login_user_data = strip_html_tags(login_user_data) 
                login_user_schema = LoginUserSchema()
                valid_data = login_user_schema.load(login_user_data)
                request.valid_data = valid_data
                
                ''' Makes Request if validation is successful'''
                return func(*args, **kwargs)
            
            except ValidationError as e:
                err_dict = {k: v[0] for k, v in e.messages.items()}              
                return api_error(400, err_dict)
        return wrapper
    return wrapper