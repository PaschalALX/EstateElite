from marshmallow import Schema, fields, validate, validates_schema, ValidationError


class NewUserSchema(Schema):
    username = fields.String(required=True, error_messages={'required': 'Username is required.'}, validate=validate.Length(min=5, error='Username is too short'))
    email = fields.Email(required=True, error_messages={'required': 'Email is required.', 'invalid': 'Email provided is invalid'})
    password = fields.String(required=True, error_messages={'required': 'Password is required.'}, validate=validate.Length(min=8, error='Password is too short'))


class LoginUserSchema(Schema):
    username = fields.String(required=False, error_messages={'required': 'Username is required.'}, validate=validate.Length(min=5, error='Username is too short'))
    email = fields.Email(required=False, error_messages={'required': 'Email is required.', 'invalid': 'Email provided is invalid'})
    password = fields.String(required=True, error_messages={'required': 'Password is required.'}, validate=validate.Length(min=8, error='Password is too short'))

    @validates_schema
    def validate_username_or_email(self, data, **kwargs):
        if not 'username' in data and not 'email' in data:
            raise ValidationError('Username or Email must be provided.')