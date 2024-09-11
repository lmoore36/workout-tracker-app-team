from flask import Flask, request, jsonify
from flask_restful import Api, Resource # type: ignore
from flask_cors import CORS
from extensions import db, migrate
from models import Workout
from sqlalchemy import extract, func
from datetime import datetime
import calendar

app = Flask(__name__)

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

db.init_app(app)
migrate.init_app(app, db)

api = Api(app)

class Workouts(Resource):
    
    # read
    def get(self, workout_id=None):
        if workout_id:
            workout = Workout.query.get(workout_id)
            if not workout:
                return {'error': 'Workout not found'}, 404
            return {'workout': workout.to_dict()}, 200
        else:
            query = Workout.query
            duration = request.args.get('duration')
            distance = request.args.get('distance')
            workout_type = request.args.get('workout_type')
            
            if duration:
                query = query.filter_by(duration=duration)
            if distance:
                query = query.filter_by(distance=distance)
            if workout_type:
                query = query.filter_by(workout_type=workout_type)
                
            workouts = query.all()
            return {'workouts': [workout.to_dict() for workout in workouts]}, 200

    # create
    def post(self):
        data = request.get_json()
        duration = data.get('duration')
        distance = data.get('distance')
        workout_type = data.get('workout_type')
        date_str = data.get('date')  # Ensure you're capturing the date

        if not duration or not distance or not workout_type:
            return {'error': 'Duration, distance, and workout_type are required'}, 400

        route_nickname = data.get('route_nickname')
        heart_rate = data.get('heart_rate')

        # Convert date string to date object
        try:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return {'error': 'Invalid date format. Use YYYY-MM-DD.'}, 400

        new_workout = Workout(
            duration=duration,
            distance=distance,
            workout_type=workout_type,
            route_nickname=route_nickname,
            heart_rate=heart_rate,
            date=date  # Set the date explicitly here
        )

        db.session.add(new_workout)
        db.session.commit()

        return {'message': 'Workout added successfully'}, 201

    # update
    def put(self, workout_id):
        workout = Workout.query.get(workout_id)
        if not workout:
            return {'error': 'Workout not found'}, 404
        
        data = request.get_json()
        workout.duration = data.get('duration', workout.duration)
        workout.distance = data.get('distance', workout.distance)
        workout.workout_type = data.get('workout_type', workout.workout_type)
        workout.route_nickname = data.get('route_nickname', workout.route_nickname)
        workout.heart_rate = data.get('heart_rate', workout.heart_rate)

        date_str = data.get('date')
        if date_str:
            try:
                workout.date = datetime.strptime(date_str, '%Y-%m-%d').date()
            except ValueError:
                return {'error': 'Invalid date format. Use YYYY-MM-DD.'}, 400

        db.session.commit()

        return {'message': 'Workout updated successfully'}, 200

    # delete
    def delete(self, workout_id):
        workout = Workout.query.get(workout_id)
        if not workout:
            return {'error': 'Workout not found'}, 404

        db.session.delete(workout)
        db.session.commit()
        return {'message': 'Workout deleted successfully'}, 200
    
class TotalDistanceByMonth(Resource):
    def get(self):
        results = (
            db.session.query(
                extract('year', Workout.date).label('year'),
                extract('month', Workout.date).label('month'),
                func.sum(Workout.distance).label('total_distance')
            )
            .group_by(extract('year', Workout.date), extract('month', Workout.date))
            .order_by(extract('year', Workout.date), extract('month', Workout.date))
            .all()
        )

        distance_by_month = [
            {
                "year": int(result.year),
                "month": calendar.month_name[int(result.month)],
                "total_distance": round(float(result.total_distance), 2)
            }
            for result in results
        ]

        return {'distance_by_month': distance_by_month}, 200

class AveragePace(Resource):
    def get(self):
        workouts = Workout.query.all()
        average_pace = []

        for workout in workouts:
            duration = workout.duration
            distance = workout.distance
            if duration and distance:
                average_pace.append({
                    "workout_id": workout.id,
                    "route_nickname": workout.route_nickname,
                    "average_pace": f"{round(float(duration / distance), 2)} min/km"
                })

        return {'workouts': average_pace}, 200
    
class TotalDistance(Resource):
    def get(self):
        workouts = Workout.query.all()
        total_distance = 0

        for workout in workouts:
            distance = workout.distance
            if distance:
                total_distance += distance

        return {'total_distance': total_distance}, 200

from flask import send_from_directory

@app.route('/')
def serve_homepage():
    return send_from_directory('.', 'index.html')


api.add_resource(Workouts, '/workouts', '/workouts/<int:workout_id>')
api.add_resource(TotalDistanceByMonth, '/workouts/total_distance_by_month')
api.add_resource(AveragePace, '/workouts/average_pace')
api.add_resource(TotalDistance, '/workouts/total_distance')

if __name__ == '__main__':
    app.run(port=5000, debug=True)