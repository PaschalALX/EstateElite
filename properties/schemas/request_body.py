from marshmallow import Schema, fields, ValidationError, validate, validates, pre_load, post_load
from bs4 import BeautifulSoup
import re

CATEGORIES = [
    'Commercial Property for Rent',
    'Commercial Property for Sale,',
    'Houses & Apartments for Rent',
    'Houses & Apartments for Sale',
    'Land & Plots for Rent',
    'Land & Plots for Sale'
]
    
class NewPropertySchema(Schema):
    title = fields.String(required=True, validate=validate.Length(min=20))
    description = fields.String(required=True, validate=validate.Length(min=20))
    address = fields.String(required=True)
    state = fields.String(required=True)
    city = fields.String(required=True)
    price = fields.Integer(required=True)
    category = fields.String(required=True)
    images = fields.List(fields.String(required=True))
    
    @pre_load
    def filter_emptyspaces(self, data, **kwargs):
        """Removes space characters at the beginning and end of provided values"""
        for k, v in data.items():
            if type(v) == str:
                data[k] = v.strip()
        return data
                
    @post_load
    def strip_tags(self, data, **kwargs):
        """Removes tags (eg: html tags) from provided values (data)."""
        for k, v in data.items():
            if type(v) == str:
                soup = BeautifulSoup(v, "html.parser")
                data[k] = soup.get_text()
        return data
    
    @validates('category')
    def check_is_valid(self, data, **kwargs):
        if not data in CATEGORIES:
            raise ValidationError('Invalid category')
    
    @validates('images')
    def image_handler(self, data, **kwargs):
        for image in data:
            if not re.match(f'^data:image', image):
                raise ValidationError(f'{image} is an invalid image format')
        
    

    
