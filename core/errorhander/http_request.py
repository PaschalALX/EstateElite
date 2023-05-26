from flask import jsonify

def bad_request(error):
    error_message = {
        "error": {   
            "code": 400,
            "description": error.description,
            "message": "Bad Request"
        }
    }
    if error.description == "Invalid user request":    
        error_message['error']['message'] =  "The request body is missing required fields or contains invalid data"
        
    return jsonify(error_message), 400

def resource_not_found(error):
    error_message = {
        "error": {
            "code": 404,
            "message": "Resource Not Found",
            "description": error.description
        }
    }
    return jsonify(error_message), 404