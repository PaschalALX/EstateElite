from flask import request
from functools import wraps
from marshmallow import ValidationError
from properties.schemas.request_body import NewPropertySchema
from core.helpers.http_response import api_error

def validate():
    def wrapper(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if request.method == 'POST':
                if not request.is_json:
                    return api_error()
                
                try:
                    new_ppty_payload = request.json
                    new_ppty_schema = NewPropertySchema()
                    valid_data = new_ppty_schema.load(new_ppty_payload)
                    
                    request.valid_data = valid_data
                    ''' Makes Request if validation is successful'''
                    return func(*args, **kwargs)

                except ValidationError as e:
                    err_dict = {k: v[0] for k, v in e.messages.items()}
                    return api_error(400, err_dict)
            return func(*args, **kwargs)
        return wrapper
    return wrapper        