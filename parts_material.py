from datetime import datetime
from src.models.user import db

class PartsMaterial(db.Model):
    __tablename__ = 'parts_materials'
    
    id = db.Column(db.Integer, primary_key=True)
    work_order_id = db.Column(db.Integer, db.ForeignKey('work_orders.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(50), nullable=True)
    additional_note = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'work_order_id': self.work_order_id,
            'name': self.name,
            'size': self.size,
            'additional_note': self.additional_note,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
