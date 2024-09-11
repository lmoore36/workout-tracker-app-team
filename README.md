# Workout Tracker API

This project is a RESTful API for tracking workout activities such as running, jogging, or cycling. Users can create, read, update, and delete workout records. Additionally, users can retrieve aggregated workout data such as total distance covered and average pace.

## Table of Contents
- [Design Decisions](#design-decisions)
- [API Endpoints](#api-endpoints)
- [Tools and Technologies](#tools-and-technologies)
- [How to Run](#how-to-run)
- [How to Test](#how-to-test)
- [Future Improvements](#future-improvements)

## Design Decisions

This project uses the following design principles:
1. **RESTful API**: The application follows RESTful design principles, allowing clients to interact with resources like workouts through standard HTTP methods (GET, POST, PUT, DELETE).
2. **Flask and Flask-RESTful**: Flask is used as the web framework because it's lightweight and easy to extend. Flask-RESTful simplifies the development of REST APIs by offering built-in request handling and response generation.
3. **SQLite for Database**: SQLite is chosen as the database because it is lightweight and easy to set up for development. It stores the workouts and user data in a simple format.
4. **Modular Structure**: The application is structured with separate files for models, routes, and database configuration, making the project easier to maintain and scale.
5. **Docker (Optional)**: You can containerize the application for consistent development environments and easier deployment.

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
- Flask: A lightweight Python web framework for building APIs.
- Flask-RESTful: An extension for Flask that simplifies the creation of REST APIs.
- Flask-CORS: Handles Cross-Origin Resource Sharing (CORS) for allowing API requests from different domains.
- SQLAlchemy: An ORM used to interact with the SQLite database.
- SQLite: A lightweight relational database used for development.
- Docker (Optional): Containerizes the application for easy deployment.
- Postman or curl: Useful tools for testing the API.

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
