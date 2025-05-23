# Modern Order Management System - Design Documentation

## System Overview
The Modern Order Management System is a web-based application designed to manage work orders with customizable fields and workflows. The system will allow users to search, create, update, and track orders through various statuses.

## Database Schema Design

### WorkOrder Model
```
WorkOrder:
- id (Primary Key)
- order_id (String, unique identifier)
- requested_by (String)
- customer (String)
- status (Enum: Requested, Pending, Approved, Scheduled, Completed)
- technician (String)
- priority (Enum: Urgent, Regular, Low)
- wo_type (String)
- due_date (Date)
- location (String)
- sched_date (Date)
- sched_time (Time)
- recurring (Boolean)
- every_freq (Integer)
- frequency (String)
- start_on (Date)
- end_on (Date)
- description (Text)
- notes (Text)
- transporter_name (String)
- transporter_id (String)
- work_order_no (String)
- order_date (Date)
- dispatcher_date (Date)
- created_at (DateTime)
- updated_at (DateTime)
```

### PartsMaterial Model
```
PartsMaterial:
- id (Primary Key)
- work_order_id (Foreign Key to WorkOrder)
- name (String)
- size (String)
- additional_note (Text)
- created_at (DateTime)
- updated_at (DateTime)
```

## API Endpoints

### Work Order Endpoints
- `GET /api/work-orders` - List all work orders with filtering options
- `GET /api/work-orders/<id>` - Get a specific work order
- `POST /api/work-orders` - Create a new work order
- `PUT /api/work-orders/<id>` - Update an existing work order
- `DELETE /api/work-orders/<id>` - Delete a work order
- `POST /api/work-orders/<id>/recurring` - Create a recurring work order

### Parts & Materials Endpoints
- `GET /api/work-orders/<id>/parts` - List all parts for a work order
- `POST /api/work-orders/<id>/parts` - Add a new part to a work order
- `PUT /api/parts/<id>` - Update a part
- `DELETE /api/parts/<id>` - Delete a part

## UI Components

### Search Section
- Advanced search form with all fields from user requirements
- Quick search by Order ID
- Search results display with sortable columns

### Work Order List
- Tabular view showing key information:
  - Customer
  - Status
  - Due Date
  - Other relevant fields
- Action buttons for each work order

### Work Order Actions
- Add New Work
- Save and Update
- Delete Work
- Create Recurring
- Print Work

### Work Order Details Form
- Form with all fields specified in user requirements
- Status workflow management
- Parts and materials section

### Parts and Materials Section
- Add/edit/delete parts and materials
- Fields for name, size, and additional notes

## Customization Features

### Field Customization
- Enable/disable specific fields
- Rename field labels
- Change field order
- Set required/optional fields

### Status Workflow Customization
- Define custom status values
- Configure status transition rules
- Set default statuses

### UI Customization
- Theme colors
- Logo placement
- Layout adjustments
- Custom CSS options

### Report Customization
- Custom report templates
- Configurable data fields in reports
- Export options (PDF, CSV, etc.)

## Technology Stack
- Backend: Flask with SQLAlchemy
- Database: MySQL
- Frontend: HTML, CSS, JavaScript
- UI Framework: Bootstrap for responsive design
- Authentication: Flask-Login
- Form Validation: WTForms

## Implementation Plan
1. Set up database models and migrations
2. Implement core API endpoints
3. Create basic UI templates
4. Implement search functionality
5. Build work order management features
6. Add parts and materials management
7. Implement customization options
8. Add reporting and printing features
9. Implement user authentication and authorization
10. Add final styling and UI enhancements
