const apiUrl = 'http://localhost:5000/workouts'; // Example URL, replace with yours

    // Function to fetch and display workouts
    async function fetchWorkouts(query = '') {
      const response = await fetch(`${apiUrl}${query}`);
      const data = await response.json();
      const workouts = data.workouts;
      const workoutList = document.getElementById('workout-list');
      workoutList.innerHTML = '';

      workouts.forEach(workout => {
        const workoutItem = document.createElement('li');
        workoutItem.classList.add('collection-item');
        workoutItem.innerHTML = `
          ${workout.workout_type ? `<strong>Type:</strong> ${workout.workout_type}<br>` : ''}
          ${workout.distance ? `<strong>Distance:</strong> ${workout.distance} km<br>` : ''}
          ${workout.duration ? `<strong>Duration:</strong> ${workout.duration} minutes<br>` : ''}
          ${workout.heart_rate ? `<strong>Heart Rate:</strong> ${workout.heart_rate} bpm<br>` : ''}
          ${workout.route_nickname ? `<strong>Route:</strong> ${workout.route_nickname}` : ''}
        `;
        workoutList.appendChild(workoutItem);
      });
    }

    // Event listener for search form submission
    document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const duration = document.getElementById('duration').value;
      const distance = document.getElementById('distance').value;
      const workout_type = document.getElementById('workout_type').value;

      let query = '?';
      if (duration) query += `duration=${duration}&`;
      if (distance) query += `distance=${distance}&`;
      if (workout_type) query += `workout_type=${workout_type}&`;

      fetchWorkouts(query);
    });

    fetchWorkouts();