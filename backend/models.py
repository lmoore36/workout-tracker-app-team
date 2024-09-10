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
    date_time = db.Column(db.DateTime, default=datetime.utcnow)
    workout_type = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'duration': self.duration,
            'distance': self.distance,
            'route_nickname': self.route_nickname,
            'heart_rate': self.heart_rate,
            'date_time': self.date_time.strftime('%Y-%m-%d %H:%M:%S'),
            'workout_type': self.workout_type
        }