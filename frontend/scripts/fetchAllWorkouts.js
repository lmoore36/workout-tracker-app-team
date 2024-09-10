const apiUrl = 'http://localhost:5000/workouts';

async function fetchWorkouts() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const workouts = data.workouts;
  const workoutTable = document.getElementById('workout-table');
  
  workoutTable.innerHTML = '';

  const tableHeader = `
  <thead>
    <tr>
      <th>Type</th>
      <th>Distance (kilometers))</th>
      <th>Duration (minutes)</th>
      <th>Heart Rate (bpm)</th>
      <th>Route</th>
    </tr>
  </thead>
`;

  workoutTable.innerHTML += tableHeader;

  const tableBody = document.createElement('tbody');

  workouts.forEach(workout => {
    const workoutRow = document.createElement('tr');

    workoutRow.innerHTML = `
      <td>${workout.workout_type}</td>
      <td>${workout.distance} kms </td>
      <td>${workout.duration}</td>
      <td>${workout.heart_rate || 'N/A'}</td>
      <td>${workout.route_nickname || 'N/A'}</td>
    `;
    tableBody.appendChild(workoutRow);
  });

  workoutTable.appendChild(tableBody);
}

document.getElementById('addWorkoutForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const duration = document.getElementById('add_duration').value;
  const distance = document.getElementById('add_distance').value;
  const workout_type = document.getElementById('add_workout_type').value;
  const route_nickname = document.getElementById('add_route_nickname').value;

  if (!duration || !distance || !route_nickname) {
    alert('Please fill in all required fields.');
    return;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      duration,
      distance,
      workout_type,
      route_nickname
    })
  });

  if (response.ok) {
    fetchWorkouts();
  } else {
    alert('Failed to add workout.');
  }
});

fetchWorkouts();