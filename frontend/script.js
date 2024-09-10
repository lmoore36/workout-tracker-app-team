// API URL (replace with your actual API endpoint)
const apiUrl = 'http://localhost:5000/workouts'; // Example URL, replace with yours

// Function to fetch and display workouts
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

// Event listener for add workout form submission
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

  // Add the new workout to the server (assuming a POST endpoint exists)
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
    fetchWorkouts(); // Refresh the workout list
  } else {
    alert('Failed to add workout.');
  }
});

async function fetchDistanceByMonth() {
    try {
      const response = await fetch('http://localhost:5000/workouts/total_distance_by_month'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      // Reference the HTML element where distances will be printed
      const monthlyDistances = document.getElementById('monthly-distances');
      monthlyDistances.innerHTML = ''; // Clear any previous content
  
      // Create and append the data from the API
      data.distance_by_month.forEach(item => {
        const monthItem = document.createElement('li');
        monthItem.classList.add('collection-item');
        monthItem.innerHTML = `<strong>Month ${item.month}</strong>: ${item.total_distance} km`;
        monthlyDistances.appendChild(monthItem);
      });
  
    } catch (error) {
      console.error('Failed to fetch distance by month:', error);
    }
}


// Fetch workouts on page load
fetchWorkouts();
fetchDistanceByMonth();