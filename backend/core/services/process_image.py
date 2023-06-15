from base64 import b64decode
from core import app
from uuid import uuid4
from os import unlink

def get_name(base64_image):
    return base64_image.split(',')[2]

def store_base64_img(base64_image):
    base64_string = base64_image.split(',')[1]
    image_b = b64decode(base64_string)
    uid = str(uuid4())
    
    image_path = f"{app.config.get('IMAGES_UPLOAD_FOLDER')}/{uid}.{get_name(base64_image)}"
    image_web_path = f"uploads/{uid}.{get_name(base64_image)}"
    with open(image_path, 'wb') as img_fp:
        img_fp.write(image_b)
        
    return image_web_path       
    
def delete_image(image_path):
    try:
        unlink(f"core/static/{image_path}")
    except:
        pass