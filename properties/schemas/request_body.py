from marshmallow import Schema, fields, ValidationError, validate, validates, pre_load, post_load
from bs4 import BeautifulSoup
from enum import Enum
import re

class Category(Enum):
    CAT_1 = 'Commercial Property for Rent'
    CAT_2 = 'Commercial Property for Sale'
    CAT_3 = 'Houses & Apartments for Rent'
    CAT_4 = 'Houses & Apartments for Sale'
    CAT_5 = 'Land & Plots for Rent'
    CAT_6 = 'Land & Plots for Sale'

category_dict = {c.name: c.value for c in Category}

class NewPropertySchema(Schema):
    title = fields.String(required=True, validate=validate.Length(min=20))
    description = fields.String(required=True, validate=validate.Length(min=20))
    address = fields.String(required=True)
    state = fields.String(required=True)
    city = fields.String(required=True)
    price = fields.Integer(required=True)
    category = fields.Enum(Category)
    images = fields.List(fields.String(required=True))
    
    @pre_load
    def filter_emptyspaces(self, data, **kwargs):
        """Removes space characters at the beginning and end of provided values"""
        for k, v in data.items():
            if type(v) == str:
                data[k] = v.strip()
        return data
    
    @validates('images')
    def image_handler(self, data, **kwargs):
        if len(data) < 3 or len(data) > 5:
            raise ValidationError('Images provided should not be less than 3 or greater than 5')
        for image in data:
            if not re.match(f'^data:image', image):
                raise ValidationError(f'{image} is an invalid image format')
        
    @post_load
    def strip_tags(self, data, **kwargs):
        """Removes tags (eg: html tags) from provided values (data)."""
        for k, v in data.items():
            if type(v) == str:
                soup = BeautifulSoup(v, "html.parser")
                data[k] = soup.get_text()
        return data

    @post_load
    def set_category(self, data, **kwargs):
        """Set category value with name from Category Enum"""
        data['category'] = data['category'].name
        return data
    

    
