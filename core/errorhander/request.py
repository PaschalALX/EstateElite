from flask import jsonify

def bad_request(error):
    error_message = {
        "error": {
            "code": 400,
            "message": "Bad Request",
            "description": error.description
        }
    }
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

def unsupported_media_type(error):
    error_message = {
        'error': {
            'code': 415,
            'message': 'Unsupported Media Type',
            'description': error.description
        }
    }
    return jsonify(error_message), 415