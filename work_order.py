from datetime import datetime
from src.models.user import db

class WorkOrder(db.Model):
    __tablename__ = 'work_orders'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String(50), unique=True, nullable=False)
    requested_by = db.Column(db.String(100), nullable=False)
    customer = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Requested')  # Requested, Pending, Approved, Scheduled, Completed
    technician = db.Column(db.String(100), nullable=True)
    priority = db.Column(db.String(20), nullable=False, default='Regular')  # Urgent, Regular, Low
    wo_type = db.Column(db.String(50), nullable=True)
    due_date = db.Column(db.Date, nullable=True)
    location = db.Column(db.String(200), nullable=True)
    sched_date = db.Column(db.Date, nullable=True)
    sched_time = db.Column(db.Time, nullable=True)
    recurring = db.Column(db.Boolean, default=False)
    every_freq = db.Column(db.Integer, nullable=True)
    frequency = db.Column(db.String(50), nullable=True)
    start_on = db.Column(db.Date, nullable=True)
    end_on = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    transporter_name = db.Column(db.String(100), nullable=True)
    transporter_id = db.Column(db.String(50), nullable=True)
    work_order_no = db.Column(db.String(50), nullable=True)
    order_date = db.Column(db.Date, nullable=True)
    dispatcher_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    parts = db.relationship('PartsMaterial', backref='work_order', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'requested_by': self.requested_by,
            'customer': self.customer,
            'status': self.status,
            'technician': self.technician,
            'priority': self.priority,
            'wo_type': self.wo_type,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'location': self.location,
            'sched_date': self.sched_date.isoformat() if self.sched_date else None,
            'sched_time': self.sched_time.isoformat() if self.sched_time else None,
            'recurring': self.recurring,
            'every_freq': self.every_freq,
            'frequency': self.frequency,
            'start_on': self.start_on.isoformat() if self.start_on else None,
            'end_on': self.end_on.isoformat() if self.end_on else None,
            'description': self.description,
            'notes': self.notes,
            'transporter_name': self.transporter_name,
            'transporter_id': self.transporter_id,
            'work_order_no': self.work_order_no,
            'order_date': self.order_date.isoformat() if self.order_date else None,
            'dispatcher_date': self.dispatcher_date.isoformat() if self.dispatcher_date else None,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
