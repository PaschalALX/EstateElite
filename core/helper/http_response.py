from flask import jsonify

def api_error(code=415, message=''):
    if code < 400 or code >= 600:
        raise Exception('Not a valid HTTP error code')
    
    codes = {
        400: {
            "description": "Bad Request"
        },
        401: {
            "description": "Unauthorized"
        },
        403: {
            "description": "Forbidden"
        },
        404: {
            "description": "Not Found"
        },
        405: {
            "description": "Method Not Allowed"
        },
        409: {
            "description": "Conflict"
        },
        415: {
            "description": "Unsupported Media Type",
            "message": "Content-Type was not application/json"
        },
        
    }
 
    if not codes.get(code):
        raise Exception('HTTP error code has not been registered')
    
    if message == '' and not codes[code].get('message'):
        raise Exception('Message must be provided')

    if message:
        codes['message'] = message
    
    return jsonify({
        "error": {
            "code": code,
            "description": codes[code].get('description'),
            "message": message if message else codes[code].get('message') 
        }
    }), code
    

def api_data(data='', code=200):
    if code < 200 or code >= 300:
        raise Exception('Not a valid HTTP success code')
    
    if not type(data) == dict and not type(data) == list:
        raise Exception('Data must be a dictionary or a list')
    
    if data == '':
        return '', code
    
    return jsonify({
        "data": data
    }), code
    
