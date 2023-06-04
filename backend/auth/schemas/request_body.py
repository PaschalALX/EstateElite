from marshmallow import (Schema, fields, validate,
                         validates_schema, post_load, ValidationError)

class NewUserSchema(Schema):
    username = fields.String(required=True, error_messages={'required': 'Username is required.'})
    email = fields.Email(required=True, error_messages={'required': 'Email is required.', 'invalid': 'Email provided is invalid'})
    password = fields.String(required=True, error_messages={'required': 'Password is required.'}, validate=validate.Length(min=8, error='Password is too short'))
    confirm_password = fields.String(required=True)
    
    @validates_schema
    def compare_passwords(self, data, **kwargs):
        if not data.get('confirm_password') == data.get('password'):
            raise ValidationError('Password does not match') 
    
    @post_load
    def remove_confirm_password(self, data, **kwargs):
        del data['confirm_password']
        return data
    
class LoginUserSchema(Schema):
    username = fields.String(required=False, error_messages={'required': 'Username is required.'})
    email = fields.Email(required=False, error_messages={'required': 'Email is required.', 'invalid': 'Email provided is invalid'})
    password = fields.String(required=True, error_messages={'required': 'Password is required.'})

    @validates_schema
    def validate_username_or_email(self, data, **kwargs):
        if not 'username' in data and not 'email' in data:
            raise ValidationError('Username or Email must be provided.')