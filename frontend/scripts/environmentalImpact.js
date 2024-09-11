document.addEventListener('DOMContentLoaded', async function() {
    try {
      const totalDistance = await fetchTotalDistance();
      console.log('Total Distance:', totalDistance);
  
      document.getElementById('totalDistanceValue').innerText = totalDistance;
  
      const treesSaved = round((totalDistance * 164) / 25000, 2);
      document.getElementById('treesSavedValue').innerText = treesSaved;
  
      const co2Saved = round((totalDistance * 164), 2);
      document.getElementById('co2SavedValue').innerText = co2Saved;
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  
  function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }