from marshmallow import Schema, fields, ValidationError, validate, validates, pre_load, post_load
from bs4 import BeautifulSoup
import re

CATEGORIES = {
    1: 'Commercial Property for Rent',
    2: 'Commercial Property for Sale,',
    3: 'Houses & Apartments for Rent',
    4: 'Houses & Apartments for Sale',
    5: 'Land & Plots for Rent',
    6: 'Land & Plots for Sale'
}
    
class NewPropertySchema(Schema):
    title = fields.String(required=True, validate=validate.Length(min=20))
    description = fields.String(required=True, validate=validate.Length(min=20))
    address = fields.String(required=True)
    state = fields.String(required=True)
    city = fields.String(required=True)
    price = fields.Integer(required=True)
    category = fields.Integer(required=True)
    images = fields.List(fields.String(required=True))
    
    @pre_load
    def filter_emptyspaces(self, data, **kwargs):
        for k, v in data.items():
            if type(v) == str:
                data[k] = v.strip()
                
    @post_load
    def strip_tags(self, data, **kwargs):
        for k, v in data.items():
            if type(v) == str:
                soup = BeautifulSoup(v, "html.parser")
                data[k] = soup.get_text()
    
    @validates('category')
    def check_is_valid(self, data, **kwargs):
        if not CATEGORIES.get(data):
            raise ValidationError('Invalid category')
    
    @validates('images')
    def image_handler(self, data, **kwargs):
        for image in data:
            if not re.match(f'^data:image', image):
                raise ValidationError(f'{image} is an invalid image format')
        
    

    