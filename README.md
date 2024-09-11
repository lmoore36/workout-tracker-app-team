# Workout Tracker API

This project is a REST API built with Flask for tracking running workouts. It allows users to record workout details such as duration, distance, heart rate, and workout type, supporting full CRUD (Create, Read, Update, Delete) functionality. 

The API also provides endpoints for aggregating data, such as calculating the total distance covered per month and determining the average pace of workouts. It is designed with Flask-RESTful, uses SQLAlchemy as the ORM for database interactions, and stores data in a lightweight SQLite database. 

## Table of Contents
- [Design Decisions](#design-decisions)
- [API Endpoints](#api-endpoints)
- [Tools and Technologies](#tools-and-technologies)
- [How to Run](#how-to-run)
- [How to Test](#how-to-test)
- [Future Improvements](#future-improvements)

## Design Decisions

This project uses the following design principles:
1. **RESTful API**: the application follows RESTful design principles allowing interaction through standard HTTP methods (GET, POST, PUT, DELETE)
2. **Flask**:
* Flask-RESTful: defines resources as classes with methods inside
* Flask-CORS: used to allow a frontend to access the api for demonstration
* Flask-Migrate: handles automatic database updates
4. **SQLite for Database**: Project database, chosen for easy set up and storage.
5. **SQLAlchemy**: Object-Relational Mapping (ORM) with easy interactions between Python development and the SQLite database.

## API Endpoints

### 1. Create a Workout
- **Endpoint**: `/workouts`
- **Method**: `POST`
- **Request Body** (JSON):
  ```json
  {
    "date": "2024-09-11",
    "duration": 30,
    "distance": 5,
    "workout_type": "RECOVERY",
    "route_nickname": "Test Route",
    "heart_rate": 135
  }
  ```
- **Response**:
  - 201 Created: If the workout is successfully created.
  - 400 Bad Request: If required fields (duration, distance, workout_type) are missing or invalid.

### 2. Get All Workouts
- **Endpoint**: `/workouts`
- **Method**: `GET`
- **Query Parameters** (Optional):
  - `duration`: Filter by workout duration.
  - `distance`: Filter by workout distance.
  - `workout_type`: Filter by type of workout (e.g., EASY, TEMPO, INTERVAL).
- **Response**:
  - 200 OK: Returns a list of workouts.
  ```json
  {
    "workouts": [
      {
        "id": 1,
        "date": "2024-09-11",
        "duration": 30,
        "distance": 5,
        "workout_type": "RECOVERY",
        "route_nickname": "Test Route",
        "heart_rate": 135
      }
    ]
  }
  ```

### 3. Get a Workout by ID
- **Endpoint**: `/workouts/<workout_id>`
- **Method**: `GET`
- **Response**:
  - 200 OK: Returns the workout data.
  - 404 Not Found: If the workout does not exist.
  ```json
  {
    "workout": {
      "id": 1,
      "date": "2024-09-11",
      "duration": 30,
      "distance": 5,
      "workout_type": "RECOVERY",
      "route_nickname": "Test Route",
      "heart_rate": 135
    }
  }
  ```

### 4. Update a Workout
- **Endpoint**: `/workouts/<workout_id>`
- **Method**: `PUT`
- **Request Body** (JSON):
  ```json
  {
    "date": "2024-09-11",
    "duration": 40,
    "distance": 6,
    "workout_type": "TEMPO",
    "route_nickname": "Updated Route",
    "heart_rate": 140
  }
  ```
- **Response**:
  - 200 OK: If the workout is successfully updated.
  - 404 Not Found: If the workout does not exist.

### 5. Delete a Workout
- **Endpoint**: `/workouts/<workout_id>`
- **Method**: `DELETE`
- **Response**:
  - 200 OK: If the workout is successfully deleted.
  - 404 Not Found: If the workout does not exist.

### 6. Get Total Distance Covered by Month
- **Endpoint**: `/workouts/total_distance_by_month`
- **Method**: `GET`
- **Response**:
  - 200 OK: Returns total distance covered per month.
  ```json
  {
    "distance_by_month": [
      {
        "year": 2024,
        "month": "September",
        "total_distance": 100.5
      }
    ]
  }
  ```

### 7. Get Average Pace for All Workouts
- **Endpoint**: `/workouts/average_pace`
- **Method**: `GET`
- **Response**:
  - 200 OK: Returns average pace per workout.
  ```json
  {
    "workouts": [
      {
        "workout_id": 1,
        "route_nickname": "Test Route",
        "average_pace": "6.00 min/km"
      }
    ]
  }
  ```

### 8. Get Total Distance Covered
- **Endpoint**: `/workouts/total_distance`
- **Method**: `GET`
- **Response**:
  - 200 OK: Returns total distance covered in all workouts.
  ```json
  {
    "total_distance": 200.75
  }
  ```

## Tools and Technologies
- Flask
- Flask-RESTful
- Flask-CORS
- SQLAlchemy
- SQLite
- Insomnia or curl: Useful tools for testing the API.

## How to Run

1. Clone the Repository
   ```bash
   git clone https://github.com/yourusername/workout-tracker-api.git
   cd workout-tracker-api
   ```

2. Set Up Virtual Environment
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Set Up the Database
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

5. Run the Application
   ```bash
   flask run
   ```

The API will now be accessible at http://127.0.0.1:5000.

## How to Test

### Testing with curl

You can use curl to interact with the API from the command line:

Creating a workout:
```bash
curl -X POST http://127.0.0.1:5000/workouts -H "Content-Type: application/json" \
-d '{"date": "2024-09-11", "duration": 30, "distance": 5, "workout_type": "RECOVERY", "route_nickname": "Test Route", "heart_rate": 135}'
```

Getting all workouts:
```bash
curl http://127.0.0.1:5000/workouts
```

##Testing with Insomnia

Import the API endpoints into Insomnia by creating a collection.
Test each API endpoint by sending the corresponding requests (GET, POST, PUT, DELETE) with the required parameters.
