// Create config directory if it doesn't exist
const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, '..', 'config');
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

// Default configuration
const DEFAULT_CONFIG = {
    "fields": {
        "order_id": {"enabled": true, "label": "Order ID", "required": true, "order": 1},
        "requested_by": {"enabled": true, "label": "Requested By", "required": true, "order": 2},
        "customer": {"enabled": true, "label": "Customer", "required": true, "order": 3},
        "status": {"enabled": true, "label": "Status", "required": true, "order": 4},
        "technician": {"enabled": true, "label": "Technician", "required": false, "order": 5},
        "priority": {"enabled": true, "label": "Priority", "required": true, "order": 6},
        "wo_type": {"enabled": true, "label": "WO Type", "required": false, "order": 7},
        "due_date": {"enabled": true, "label": "Due Date", "required": false, "order": 8},
        "location": {"enabled": true, "label": "Location", "required": false, "order": 9},
        "sched_date": {"enabled": true, "label": "Sched. Date", "required": false, "order": 10},
        "sched_time": {"enabled": true, "label": "Sched. Time", "required": false, "order": 11},
        "recurring": {"enabled": true, "label": "Recurring", "required": false, "order": 12},
        "every_freq": {"enabled": true, "label": "Every Freq.", "required": false, "order": 13},
        "frequency": {"enabled": true, "label": "Frequency", "required": false, "order": 14},
        "start_on": {"enabled": true, "label": "Start On", "required": false, "order": 15},
        "end_on": {"enabled": true, "label": "End On", "required": false, "order": 16},
        "description": {"enabled": true, "label": "Description", "required": false, "order": 17},
        "notes": {"enabled": true, "label": "Notes", "required": false, "order": 18},
        "transporter_name": {"enabled": true, "label": "Transporter Name", "required": false, "order": 19},
        "transporter_id": {"enabled": true, "label": "Transporter ID", "required": false, "order": 20},
        "work_order_no": {"enabled": true, "label": "Work Order No.", "required": false, "order": 21},
        "order_date": {"enabled": true, "label": "Order Date", "required": false, "order": 22},
        "dispatcher_date": {"enabled": true, "label": "Dispatcher Date", "required": false, "order": 23}
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
};

// Write default config to file
const configFile = path.join(configDir, 'system_config.json');
if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, JSON.stringify(DEFAULT_CONFIG, null, 2));
    console.log('Default configuration created at:', configFile);
} else {
    console.log('Configuration file already exists at:', configFile);
}

// Create images directory for logo uploads
const imagesDir = path.join(__dirname, '..', 'static', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('Images directory created at:', imagesDir);
} else {
    console.log('Images directory already exists at:', imagesDir);
}

console.log('Configuration setup complete!');
