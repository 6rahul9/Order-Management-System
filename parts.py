from flask import Blueprint, request, jsonify
from src.models.work_order import WorkOrder
from src.models.parts_material import PartsMaterial
from src.models.user import db

parts_bp = Blueprint('parts', __name__)

# List all parts for a work order
@parts_bp.route('/work-orders/<int:work_order_id>/parts', methods=['GET'])
def get_parts(work_order_id):
    work_order = WorkOrder.query.get(work_order_id)
    
    if not work_order:
        return jsonify({
            'success': False,
            'message': f'Work order with ID {work_order_id} not found'
        }), 404
    
    parts = [part.to_dict() for part in work_order.parts]
    
    return jsonify({
        'success': True,
        'data': parts,
        'count': len(parts)
    })

# Add a new part to a work order
@parts_bp.route('/work-orders/<int:work_order_id>/parts', methods=['POST'])
def add_part(work_order_id):
    work_order = WorkOrder.query.get(work_order_id)
    
    if not work_order:
        return jsonify({
            'success': False,
            'message': f'Work order with ID {work_order_id} not found'
        }), 404
    
    data = request.json
    
    part = PartsMaterial(
        work_order_id=work_order_id,
        name=data.get('name'),
        size=data.get('size'),
        additional_note=data.get('additional_note')
    )
    
    db.session.add(part)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Part added successfully',
        'data': part.to_dict()
    }), 201

# Update a part
@parts_bp.route('/parts/<int:id>', methods=['PUT'])
def update_part(id):
    part = PartsMaterial.query.get(id)
    
    if not part:
        return jsonify({
            'success': False,
            'message': f'Part with ID {id} not found'
        }), 404
    
    data = request.json
    
    if 'name' in data:
        part.name = data['name']
    if 'size' in data:
        part.size = data['size']
    if 'additional_note' in data:
        part.additional_note = data['additional_note']
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Part updated successfully',
        'data': part.to_dict()
    })

# Delete a part
@parts_bp.route('/parts/<int:id>', methods=['DELETE'])
def delete_part(id):
    part = PartsMaterial.query.get(id)
    
    if not part:
        return jsonify({
            'success': False,
            'message': f'Part with ID {id} not found'
        }), 404
    
    db.session.delete(part)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Part deleted successfully'
    })
