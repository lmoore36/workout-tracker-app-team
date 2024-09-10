let chart;

document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('monthlyDistancesChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      datasets: [{
        label: 'Distance (mi)',
        data: Array(12).fill(0),
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

    const currentYear = new Date().getFullYear();

    const distancesByMonth = Array(12).fill(0);

    data.distance_by_month.forEach(item => {
      const monthIndex = new Date(item.month + " 1, " + item.year).getMonth();
      
      if (item.year === currentYear) {
        distancesByMonth[monthIndex] = item.total_distance;
      }
    });

    chart.data.datasets[0].data = distancesByMonth;
    chart.update();

  } catch (error) {
    console.error('Failed to fetch distance by month:', error);
  }
}
