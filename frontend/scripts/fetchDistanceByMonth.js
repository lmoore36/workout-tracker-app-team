let chart;

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the chart
  const ctx = document.getElementById('monthlyDistancesChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [], // Will be populated with months
      datasets: [{
        label: 'Distance (km)',
        data: [], // Will be populated with distances
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Fetch distances by month on page load
  fetchDistanceByMonth();
});

async function fetchDistanceByMonth() {
  try {
    const response = await fetch('http://localhost:5000/workouts/total_distance_by_month'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Update the chart with the fetched data
    const labels = data.distance_by_month.map(item => `Month ${item.month}`);
    const distances = data.distance_by_month.map(item => item.total_distance);

    chart.data.labels = labels;
    chart.data.datasets[0].data = distances;
    chart.update();

  } catch (error) {
    console.error('Failed to fetch distance by month:', error);
  }
}