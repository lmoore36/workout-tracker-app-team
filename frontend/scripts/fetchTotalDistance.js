async function fetchTotalDistance() {
    try {
      const response = await fetch('http://localhost:5000/workouts/total_distance');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      return data.total_distance;
  
    } catch (error) {
      console.error('Failed to fetch total distance:', error);
    }
  }