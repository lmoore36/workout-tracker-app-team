document.addEventListener('DOMContentLoaded', function() {
  // Fetch and display all workouts on page load
  fetchWorkouts();

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

  async function fetchWorkouts(query = '') {
    try {
      const response = await fetch(`http://localhost:5000/workouts${query}`); // Append query to the URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const workoutTableBody = document.getElementById('searchResults');
      workoutTableBody.innerHTML = '';

      // Populate the table with the workouts data
      data.workouts.forEach(workout => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${workout.route_nickname || 'N/A'}</td>
          <td>${workout.date || 'N/A'}</td>
          <td>${workout.workout_type || 'N/A'}</td>
          <td>${workout.distance ? workout.distance + ' mi' : 'N/A'}</td>
          <td>${workout.duration ? workout.duration + ' minutes' : 'N/A'}</td>
          <td>${workout.heart_rate ? workout.heart_rate + ' bpm' : 'N/A'}</td>
        `;
        workoutTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
    }
  }
});