# email_verification.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token
from auth_service.models import User

email_verification_bp = Blueprint('email_verification', __name__)

@email_verification_bp.route('/email-verification', methods=['POST'])
def request_email_verification():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        # Generate email verification token
        token = create_access_token(identity=user.id, expires_delta=False)
        # Send email verification email with token
        #...
        return jsonify({'message': 'Email verification email sent'})
    return jsonify({'message': 'User not found'}), 404

@email_verification_bp.route('/email-verification/<string:token>', methods=['GET'])
def verify_email(token):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        user.email_verified = True
        db.session.commit()
        return jsonify({'message': 'Email verified successfully'})
    return jsonify({'message': 'Invalid token'}), 401
