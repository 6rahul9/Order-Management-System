import os
from flask import Blueprint, send_file, jsonify, request
from werkzeug.utils import secure_filename
import json

config_bp = Blueprint('config', __name__)

# Path to store configuration files
CONFIG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config')
os.makedirs(CONFIG_DIR, exist_ok=True)

# Default configuration
DEFAULT_CONFIG = {
    "fields": {
        "order_id": {"enabled": True, "label": "Order ID", "required": True, "order": 1},
        "requested_by": {"enabled": True, "label": "Requested By", "required": True, "order": 2},
        "customer": {"enabled": True, "label": "Customer", "required": True, "order": 3},
        "status": {"enabled": True, "label": "Status", "required": True, "order": 4},
        "technician": {"enabled": True, "label": "Technician", "required": False, "order": 5},
        "priority": {"enabled": True, "label": "Priority", "required": True, "order": 6},
        "wo_type": {"enabled": True, "label": "WO Type", "required": False, "order": 7},
        "due_date": {"enabled": True, "label": "Due Date", "required": False, "order": 8},
        "location": {"enabled": True, "label": "Location", "required": False, "order": 9},
        "sched_date": {"enabled": True, "label": "Sched. Date", "required": False, "order": 10},
        "sched_time": {"enabled": True, "label": "Sched. Time", "required": False, "order": 11},
        "recurring": {"enabled": True, "label": "Recurring", "required": False, "order": 12},
        "every_freq": {"enabled": True, "label": "Every Freq.", "required": False, "order": 13},
        "frequency": {"enabled": True, "label": "Frequency", "required": False, "order": 14},
        "start_on": {"enabled": True, "label": "Start On", "required": False, "order": 15},
        "end_on": {"enabled": True, "label": "End On", "required": False, "order": 16},
        "description": {"enabled": True, "label": "Description", "required": False, "order": 17},
        "notes": {"enabled": True, "label": "Notes", "required": False, "order": 18},
        "transporter_name": {"enabled": True, "label": "Transporter Name", "required": False, "order": 19},
        "transporter_id": {"enabled": True, "label": "Transporter ID", "required": False, "order": 20},
        "work_order_no": {"enabled": True, "label": "Work Order No.", "required": False, "order": 21},
        "order_date": {"enabled": True, "label": "Order Date", "required": False, "order": 22},
        "dispatcher_date": {"enabled": True, "label": "Dispatcher Date", "required": False, "order": 23}
    },
    "statuses": [
        {"value": "Requested", "label": "Requested", "color": "#FFC107"},
        {"value": "Pending", "label": "Pending", "color": "#2196F3"},
        {"value": "Approved", "label": "Approved", "color": "#4CAF50"},
        {"value": "Scheduled", "label": "Scheduled", "color": "#9C27B0"},
        {"value": "Completed", "label": "Completed", "color": "#4CAF50"}
    ],
    "priorities": [
        {"value": "Urgent", "label": "Urgent", "color": "#F44336"},
        {"value": "Regular", "label": "Regular", "color": "#2196F3"},
        {"value": "Low", "label": "Low", "color": "#9E9E9E"}
    ],
    "ui": {
        "theme": {
            "primary_color": "#1976D2",
            "secondary_color": "#424242",
            "accent_color": "#82B1FF",
            "background_color": "#FFFFFF",
            "text_color": "#212121"
        },
        "logo": "logo.png",
        "company_name": "Modern Order Management",
        "date_format": "MM/DD/YYYY",
        "time_format": "HH:mm",
        "items_per_page": 10
    }
}

# Configuration file path
CONFIG_FILE = os.path.join(CONFIG_DIR, 'system_config.json')

# Initialize configuration file if it doesn't exist
if not os.path.exists(CONFIG_FILE):
    with open(CONFIG_FILE, 'w') as f:
        json.dump(DEFAULT_CONFIG, f, indent=2)

# Get system configuration
@config_bp.route('/config', methods=['GET'])
def get_config():
    try:
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
        return jsonify({
            'success': True,
            'data': config
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error loading configuration: {str(e)}'
        }), 500

# Update system configuration
@config_bp.route('/config', methods=['PUT'])
def update_config():
    try:
        data = request.json
        
        # Read current config
        with open(CONFIG_FILE, 'r') as f:
            current_config = json.load(f)
        
        # Update fields if provided
        if 'fields' in data:
            current_config['fields'].update(data['fields'])
        
        # Update statuses if provided
        if 'statuses' in data:
            current_config['statuses'] = data['statuses']
        
        # Update priorities if provided
        if 'priorities' in data:
            current_config['priorities'] = data['priorities']
        
        # Update UI settings if provided
        if 'ui' in data:
            for key, value in data['ui'].items():
                current_config['ui'][key] = value
        
        # Write updated config back to file
        with open(CONFIG_FILE, 'w') as f:
            json.dump(current_config, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': 'Configuration updated successfully',
            'data': current_config
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error updating configuration: {str(e)}'
        }), 500

# Reset configuration to default
@config_bp.route('/config/reset', methods=['POST'])
def reset_config():
    try:
        with open(CONFIG_FILE, 'w') as f:
            json.dump(DEFAULT_CONFIG, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': 'Configuration reset to default',
            'data': DEFAULT_CONFIG
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error resetting configuration: {str(e)}'
        }), 500

# Upload logo
@config_bp.route('/config/logo', methods=['POST'])
def upload_logo():
    if 'logo' not in request.files:
        return jsonify({
            'success': False,
            'message': 'No logo file provided'
        }), 400
    
    logo_file = request.files['logo']
    
    if logo_file.filename == '':
        return jsonify({
            'success': False,
            'message': 'No logo file selected'
        }), 400
    
    if logo_file:
        filename = secure_filename(logo_file.filename)
        logo_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'images', filename)
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(logo_path), exist_ok=True)
        
        logo_file.save(logo_path)
        
        # Update config with new logo filename
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
        
        config['ui']['logo'] = filename
        
        with open(CONFIG_FILE, 'w') as f:
            json.dump(config, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': 'Logo uploaded successfully',
            'data': {
                'logo': filename
            }
        })
    
    return jsonify({
        'success': False,
        'message': 'Error uploading logo'
    }), 500
