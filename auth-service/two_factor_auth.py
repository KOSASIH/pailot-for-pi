# two_factor_auth.py
from flask import Blueprint, request, jsonify
from auth_service.models import User
from pyotp import TOTP

two_factor_auth_bp = Blueprint('two_factor_auth', __name__)

@two_factor_auth_bp.route('/2fa/setup', methods=['GET'])
@jwt_required
def setup_two_factor_auth():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        # Generate QR code and secret key
        totp = TOTP(user.secret_key)
        qr_code = totp.provisioning_uri(name='Pailot 2FA', issuer_name='Pailot')
        return jsonify({'qr_code': qr_code})
    return jsonify({'message': 'User not found'}), 404

@two_factor_auth_bp.route('/2fa/verify', methods=['POST'])
@jwt_required
def verify_two_factor_auth():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        token = request.json.get('token')
        totp = TOTP(user.secret_key)
        if totp.verify(token):
            return jsonify({'message': '2FA verified successfully'})
        return jsonify({'message': 'Invalidtoken'}), 401
    return jsonify({'message': 'User not found'}), 404
