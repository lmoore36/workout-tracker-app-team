document.getElementById('addWorkoutForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const date = document.getElementById('add_date').value;
    const duration = document.getElementById('add_duration').value;
    const distance = document.getElementById('add_distance').value;
    const workout_type = document.getElementById('add_workout_type').value;
    const route_nickname = document.getElementById('add_route_nickname').value;
    const heart_rate = document.getElementById('add_heart_rate').value;
  
    console.log('Form Submission:', { date, duration, distance, workout_type, route_nickname, heart_rate });
  
    if (!date || !duration || !distance || !route_nickname) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const requestData = {
        date,
        duration,
        distance,
        workout_type,
        route_nickname,
        heart_rate
    };

    localStorage.setItem('lastFormSubmission', JSON.stringify(requestData));
    console.log('Data being submitted to API:', requestData);
  
    // Send data to API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
  
    if (response.ok) {
      fetchWorkouts();
    } else {
      alert('Failed to add workout.');
    }

    return false;
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  
    var dateElems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dateElems, {
      format: 'yyyy-mm-dd',
      autoClose: true,
      onClose: function() {
        const picker = M.Datepicker.getInstance(dateElems[0]);
        if (picker && picker.date) {
          const selectedDate = picker.date;
          console.log('Selected Date:', selectedDate);
          const formattedDate = selectedDate.toISOString().split('T')[0];
          document.getElementById('add_date').value = formattedDate;
          
          // Explicitly trigger the change event to ensure the value is updated
          const event = new Event('change', { bubbles: true });
          document.getElementById('add_date').dispatchEvent(event);
  
          console.log('Formatted Date:', formattedDate);
        } else {
          console.error('Date picker instance or date is undefined');
        }
      }
    });
  });