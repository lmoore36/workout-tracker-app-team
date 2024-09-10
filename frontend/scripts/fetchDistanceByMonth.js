let chart;

document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('monthlyDistancesChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Distance (mi)',
        data: [],
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

  fetchDistanceByMonth();
});

async function fetchDistanceByMonth() {
  try {
    const response = await fetch('http://localhost:5000/workouts/total_distance_by_month');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const labels = data.distance_by_month.map(item => `${item.month}`);
    const distances = data.distance_by_month.map(item => item.total_distance);

    chart.data.labels = labels;
    chart.data.datasets[0].data = distances;
    chart.update();

  } catch (error) {
    console.error('Failed to fetch distance by month:', error);
  }
}