# password_reset.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token
from auth_service.models import User

password_reset_bp = Blueprint('password_reset', __name__)

@password_reset_bp.route('/password-reset', methods=['POST'])
def request_password_reset():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        # Generate password reset token
        token = create_access_token(identity=user.id, expires_delta=False)
        # Send password reset email with token
        #...
        return jsonify({'message': 'Password reset email sent'})
    return jsonify({'message': 'User not found'}), 404

@password_reset_bp.route('/password-reset/<string:token>', methods=['POST'])
def reset_password(token):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        new_password = request.json.get('new_password')
        confirm_password = request.json.get('confirm_password')
        if new_password == confirm_password:
            user.password = new_password
            db.session.commit()
            return jsonify({'message': 'Password reset successfully'})
        return jsonify({'message': 'Passwords do not match'}), 400
    return jsonify({'message': 'Invalid token'}), 401
