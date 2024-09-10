const apiUrl = 'http://localhost:5000/workouts';

async function fetchWorkouts() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const workouts = data.workouts;
  const workoutList = document.getElementById('workout-list');
  workoutList.innerHTML = '';

  workouts.forEach(workout => {
    const workoutItem = document.createElement('li');
    workoutItem.classList.add('collection-item');
    workoutItem.innerHTML = `
      <strong>Type:</strong> ${workout.workout_type}<br>
      <strong>Distance:</strong> ${workout.distance} km<br>
      <strong>Duration:</strong> ${workout.duration} minutes<br>
      <strong>Heart Rate:</strong> ${workout.heart_rate || 'N/A'} bpm<br>
      <strong>Route:</strong> ${workout.route_nickname || 'N/A'}
    `;
    workoutList.appendChild(workoutItem);
  });
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