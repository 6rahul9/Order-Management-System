# Modern Order Management System - User Guide

## Introduction

The Modern Order Management System is a comprehensive web application designed to help you manage work orders efficiently. This guide will walk you through the system's features and how to customize it to fit your specific needs.

## Getting Started

### System Requirements

- Web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection
- Server with Python 3.11+ and required dependencies (listed in requirements.txt)

### Accessing the System

1. Deploy the application using the instructions in the deployment section
2. Open your web browser and navigate to the application URL
3. The system will load the dashboard by default

## Main Features

### Dashboard

The dashboard provides an overview of your work orders, including:

- Total work orders count
- Work orders by status (Requested, Pending, Approved, Scheduled, Completed)
- Status distribution chart
- Recent work orders list

### Work Orders Management

#### Searching Work Orders

1. Navigate to the Work Orders page
2. Use the search bar to find work orders by Order ID
3. Click "Advanced Search" to search by additional fields:
   - Requested By
   - Customer
   - Status
   - Technician
   - Priority
   - WO Type
   - Due Date
   - Location

#### Creating Work Orders

1. Click "Add New Work" button
2. Fill in the required fields (marked with *)
3. Add optional information as needed
4. Click "Save" to create the work order

#### Editing Work Orders

1. Find the work order in the list
2. Click the "Edit" button (pencil icon)
3. Modify the information as needed
4. Click "Save" to update the work order

#### Deleting Work Orders

1. Find the work order in the list
2. Click the "Delete" button (trash icon)
3. Confirm deletion in the popup dialog

#### Creating Recurring Work Orders

1. Find the work order in the list
2. Click the "Create Recurring" button (repeat icon)
3. Set the frequency and duration
4. Click "Create" to generate recurring work orders

#### Printing Work Orders

1. Find the work order in the list
2. Click the "Print" button (printer icon)
3. A printable version will open in a new tab
4. Use your browser's print function to print or save as PDF

### Parts and Materials

Each work order can have associated parts and materials:

1. Edit a work order
2. Scroll down to the "Parts and Materials" section
3. Click "Add Part" to add a new part
4. Fill in the part details:
   - Name
   - Size
   - Additional Note
5. Click "Save" to add the part to the work order

## Customization Options

### Field Configuration

1. Navigate to the Settings page
2. Select the "Fields" tab
3. For each field, you can:
   - Enable/disable the field
   - Change the label
   - Make it required or optional
   - Change the display order
4. Click "Save Changes" to apply your configuration

### Status Configuration

1. Navigate to the Settings page
2. Select the "Status" tab
3. You can:
   - Add new statuses
   - Edit existing status labels
   - Change status colors
   - Remove unused statuses
4. Click "Save Changes" to apply your configuration

### Priority Configuration

1. Navigate to the Settings page
2. Select the "Status" tab
3. Scroll down to the Priority section
4. You can:
   - Add new priorities
   - Edit existing priority labels
   - Change priority colors
   - Remove unused priorities
5. Click "Save Changes" to apply your configuration

### UI Configuration

1. Navigate to the Settings page
2. Select the "UI" tab
3. You can customize:
   - Theme colors (primary, secondary, accent)
   - Company name
   - Logo (upload your own)
   - Date and time formats
   - Items per page
4. Click "Save Changes" to apply your configuration

## Deployment Instructions

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### Deployment Steps

1. Clone or download the application files to your server
2. Navigate to the application directory
3. Create and activate a virtual environment (recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run the application:
   ```
   python -m src.main
   ```
6. Access the application at http://localhost:5000

### Production Deployment

For production deployment, it's recommended to use a WSGI server like Gunicorn:

1. Install Gunicorn:
   ```
   pip install gunicorn
   ```
2. Run with Gunicorn:
   ```
   gunicorn -w 4 'src.main:app'
   ```

## Troubleshooting

### Common Issues

1. **Application doesn't start**
   - Check if all dependencies are installed
   - Verify Python version (3.11+)
   - Check for error messages in the console

2. **Database errors**
   - Ensure database configuration is correct
   - Check database connection

3. **UI display issues**
   - Clear browser cache
   - Try a different browser
   - Check console for JavaScript errors

### Getting Help

If you encounter any issues not covered in this guide, please contact support at support@example.com.

## Customization Examples

### Example 1: Field Customization

To customize the work order form for a transportation company:

1. Go to Settings > Fields
2. Enable "Transporter Name" and "Transporter ID" fields
3. Make "Location" field required
4. Rename "WO Type" to "Transportation Type"
5. Save changes

### Example 2: Status Workflow

To create a custom approval workflow:

1. Go to Settings > Status
2. Add statuses: "Submitted", "Under Review", "Approved", "In Progress", "Completed"
3. Assign appropriate colors
4. Save changes

## Conclusion

The Modern Order Management System is designed to be flexible and adaptable to your specific needs. By utilizing the customization options, you can tailor the system to match your workflow and business requirements.
