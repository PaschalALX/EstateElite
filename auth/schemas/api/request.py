email_regex_pattern = r"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"

create_user_schema = {
    
    "title": "Create User Schema",
    "type": "object",
    "properties": {
        "username": {
            "type": "string"
        },
        "email": {
            "type": "string", 
            "format": "email",
            "pattern": email_regex_pattern
        },
        "password": {
            "type": "string",
            "minLength": 8
        }
    },
    "required": ["username", "email", "password"]
}

login_user_schema = {
    
    "title": "Login User Schema",
    "type": "object",
    "properties": {
        "username_or_email": {
            "type": "string"
        },
        "password": {
            "type": "string",
            "minLength": 8
        }
    },
    "required": ["username_or_email", "password"]
}