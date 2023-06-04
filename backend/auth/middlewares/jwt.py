from flask import request
from core import jwt_cache, app
import jwt
from functools import wraps
from core.helpers.http_response import api_error

def jwt_required():
    def wrapper(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            
            auth_header_value = request.headers.get('Authorization')
            if not auth_header_value:
                return api_error(401, 'Authorization header is missing')
            
            provided_jwt_token = auth_header_value.split(' ')[1]
            
            try:
                payload = jwt.decode(provided_jwt_token, app.config['JWT_ACCESS_SECRET_KEY'], 'HS256')
                if not payload:
                    return api_error(403, 'Expired access token')
                
                user_id = payload.get('user_id')
                if not jwt_cache.has(user_id):
                    return api_error(403, 'Revoked access token')
                
                return func(*args, **kwargs)
            except Exception as e:
                return api_error(403, 'Invalid access token')
        return wrapper
    return wrapper