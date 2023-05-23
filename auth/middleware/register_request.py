from flask import request, abort
import re

def validate(func):
    def wrapper(*args, **kwargs):
        if not request.is_json:
            abort(400)
            
        try:
            user_data =  request.get_json()
            
            if not user_data['username'] or not user_data['email'] or not user_data['password']:
                abort(400)
                
            email_regex = r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
  
            pwd_regex = r".{8,}"
            if not re.match(email_regex, user_data['email']):
                abort(400)
                
            if not re.match(pwd_regex, user_data['password']):
                abort(400)
        
            return func(*args, **kwargs)
        except Exception as e:
            print(e)
            abort(400)
        
    return wrapper