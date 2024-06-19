# role_management.py
from flask import Blueprint, request, jsonify
from auth_service.models import Role, User

role_management_bp = Blueprint('role_management', __name__)

@role_management_bp.route('/roles', methods=['GET'])
@jwt_required
def get_roles():
    roles = Role.query.all()
    return jsonify([{'id': role.id, 'name': role.name} for role in roles])

@role_management_bp.route('/roles', methods=['POST'])
@jwt_required
def create_role():
    name = request.json.get('name')
    role = Role(name=name)
    db.session.add(role)
    db.session.commit()
    return jsonify({'message': 'Role created successfully'})

@role_management_bp.route('/users/<int:user_id>/roles', methods=['GET'])
@jwt_required
def get_user_roles(user_id):
    user = User.query.get(user_id)
    if user:
        roles = user.roles
        return jsonify([{'id': role.id, 'name': role.name} for role in roles])
    return jsonify({'message': 'User not found'}), 404

@role_management_bp.route('/users/<int:user_id>/roles', methods=['POST'])
@jwt_required
def add_user_role(user_id):
    role_id = request.json.get('role_id')
    user = User.query.get(user_id)
    role = Role.query.get(role_id)
    if user and role:
        user.roles.append(role)
        db.session.commit()
        return jsonify({'message': 'Role added to user successfully'})
    return jsonify({'message': 'User or role not found'}), 404
