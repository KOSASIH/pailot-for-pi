# logistics_provider.py
from flask import Blueprint, request, jsonify
from models import LogisticsProvider

logistics_provider_bp = Blueprint('logistics_provider', __name__)

@logistics_provider_bp.route('/register-logistics-provider', methods=['POST'])
def register_logistics_provider():
    provider_data = request.json
    logistics_provider = LogisticsProvider(**provider_data)
    db.session.add(logistics_provider)
    db.session.commit()
    return jsonify({'message': 'Logistics provider registered successfully'})

@logistics_provider_bp.route('/get-logistics-providers', methods=['GET'])
def get_logistics_providers():
    logistics_providers = LogisticsProvider.query.all()
    return jsonify({'message': 'Logistics providers', 'providers': [provider.to_dict() for provider in logistics_providers]})
