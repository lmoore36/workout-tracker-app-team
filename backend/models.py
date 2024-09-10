from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from extensions import db

class Workout(db.Model): # type: ignore
    __tablename__='workouts'
    id = db.Column(db.Integer, primary_key=True)
    duration = db.Column(db.Float, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    route_nickname = db.Column(db.String(100), nullable=True)
    heart_rate = db.Column(db.Integer, nullable=True)
    date = db.Column(db.Date, default=lambda: datetime.utcnow().date())
    workout_type = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'duration': self.duration,
            'distance': self.distance,
            'route_nickname': self.route_nickname,
            'heart_rate': self.heart_rate,
            'date': self.date.strftime('%Y-%m-%d'),
            'workout_type': self.workout_type
        }