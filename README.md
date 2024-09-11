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

### 1. **Create a Workout**
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
