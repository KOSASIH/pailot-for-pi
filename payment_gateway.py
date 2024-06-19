# payment_gateway.py
from flask import Blueprint, request, jsonify
from pi_coin_api import PiCoinAPI

payment_gateway_bp = Blueprint('payment_gateway', __name__)

@payment_gateway_bp.route('/payment', methods=['POST'])
def process_payment():
    payment_data = request.json
    pi_coin_api = PiCoinAPI()
    transaction_id = pi_coin_api.create_transaction(payment_data['amount'], payment_data['receiver_address'])
    if transaction_id:
        # Update order status to "paid"
        #...
        return jsonify({'message': 'Payment successful', 'transaction_id': transaction_id})
    return jsonify({'message': 'Payment failed'}), 400

@payment_gateway_bp.route('/payment/<string:transaction_id>', methods=['GET'])
def get_payment_status(transaction_id):
    pi_coin_api = PiCoinAPI()
    transaction_status = pi_coin_api.get_transaction_status(transaction_id)
    if transaction_status:
        return jsonify({'message': 'Payment status', 'tatus': transaction_status})
    return jsonify({'message': 'Transaction not found'}), 404
