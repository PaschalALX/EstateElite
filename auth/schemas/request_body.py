from marshmallow import (Schema, fields, validate, post_load,
                         validates_schema, pre_load, ValidationError)
from bs4 import BeautifulSoup

class NewUserSchema(Schema):
    username = fields.String(required=True, error_messages={'required': 'Username is required.'}, validate=validate.Length(min=5, error='Username is too short'))
    email = fields.Email(required=True, error_messages={'required': 'Email is required.', 'invalid': 'Email provided is invalid'})
    password = fields.String(required=True, error_messages={'required': 'Password is required.'}, validate=validate.Length(min=8, error='Password is too short'))

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

class LoginUserSchema(Schema):
    username = fields.String(required=False, error_messages={'required': 'Username is required.'}, validate=validate.Length(min=5, error='Username is too short'))
    email = fields.Email(required=False, error_messages={'required': 'Email is required.', 'invalid': 'Email provided is invalid'})
    password = fields.String(required=True, error_messages={'required': 'Password is required.'}, validate=validate.Length(min=8, error='Password is too short'))

    @validates_schema
    def validate_username_or_email(self, data, **kwargs):
        if not 'username' in data and not 'email' in data:
            raise ValidationError('Username or Email must be provided.')