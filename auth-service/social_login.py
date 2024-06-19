# social_login.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token
from auth_service.models import User

social_login_bp = Blueprint('social_login', __name__)

@social_login_bp.route('/social-login/<string:provider>', methods=['POST'])
def social_login(provider):
    social_id = request.json.get('social_id')
    email = request.json.get('email')
    name = request.json.get('name')
    user = User.query.filter_by(email=email).first()
    if user:
        # Update user's social_id and name
        user.social_id = social_id
        user.name = name
        db.session.commit()
        # Generate JWT token
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token})
    else:
        # Create new user and generate JWT token
        new_user = User(email=email, name=name, social_id=social_id)
        db.session.add(new_user)
        db.session.commit()
        access_token = create_access_token(identity=new_user.id)
        return jsonify({'access_token': access_token})
