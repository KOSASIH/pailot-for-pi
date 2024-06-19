# api_key_auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token
from auth_service.models import User, ApiKey

api_key_auth_bp = Blueprint('api_key_auth', __name__)

@api_key_auth_bp.route('/api-key-auth', methods=['POST'])
@jwt_required
def request_api_key():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
       # Generate API key
        api_key = ApiKey(user_id=user_id)
        db.session.add(api_key)
        db.session.commit()
        return jsonify({'api_key': api_key.key})
    return jsonify({'message': 'User not found'}), 404

@api_key_auth_bp.route('/api-key-auth', methods=['DELETE'])
@jwt_required
def revoke_api_key():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        api_key = user.api_key
        if api_key:
            db.session.delete(api_key)
            db.session.commit()
            return jsonify({'message': 'API key revoked successfully'})
        return jsonify({'message': 'No API key found'}), 404
    return jsonify({'message': 'User not found'}), 404
