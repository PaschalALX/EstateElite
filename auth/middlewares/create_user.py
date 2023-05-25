from flask import request, abort, jsonify
from functools import wraps
from ..schemas.request import NewUserSchema, ValidationError

def validate():
    def wrapper(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                abort(415)
            
            try:
                new_user_data = request.json
                print(new_user_data)
                new_user_schema = NewUserSchema()
                valid_data = new_user_schema.load(new_user_data)
                request.valid_data = valid_data
                
                ''' Makes Request if validation is successful'''
                return func(*args, **kwargs)
            
            except ValidationError as e:
                err_dict = {k: v[0] for k, v in e.messages.items()}
                err_resp = {
                    'error': err_dict
                }
                
                return jsonify(err_resp), 400
                               
        return wrapper
    return wrapper