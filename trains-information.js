function submitSearch() {
  let userInput = document.getElementById('station').value.trim();
  if (!userInput) {
    console.error("Please enter a station name.");
    return;
  }

  // Auto-append "Station" if not already present
  if (!userInput.toLowerCase().endsWith('station')) {
    userInput += ' Station';
  }

  const formattedInput = encodeURIComponent(userInput);
  searchStation(formattedInput);
}

function displayLoading() {
  const container = document.getElementById('results');
  container.innerHTML = '<p>Loading...</p>';
}

async function searchStation(query) {

  displayLoading();

  try {
    const res = await fetch(`https://api.tfl.gov.uk/StopPoint/Search/${query}`);
    if (!res.ok) throw new Error(`Search error: ${res.status}`);

    const data = await res.json();

    if (!data.matches || data.matches.length === 0) {
      throw new Error("No matching station found. Status: ${response.status}");
    }

    const stationId = data.matches[0].id;
    getArrivals(stationId);

  } catch (error) {
    console.error("Station search failed:", error.message);
    displayMessage("Station not found. Please check the spelling.");
  }
}


async function getArrivals(stationId) {

  try {
    const url = `https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals?app_key=fe96f0290c804e9b93203a34f4e3fb2c`;
    console.log('Fetching arrivals from:', url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Arrivals fetch error: ${res.status}`);

    const arrivalsData = await res.json();

    if (arrivalsData.length === 0) {
      displayMessage("No arrivals found for this station.");
      return;
    }

    console.log('Arrivals data:', arrivalsData);

    displayArrivals(arrivalsData);
  } catch (error) {
    console.error("Failed to fetch arrivals:", error.message);
    displayMessage("Failed to load arrival times. Please try again.");
  }
}

function displayArrivals(arrivals) {
  const container = document.getElementById('results');
  container.innerHTML = ''; // Clear previous results

  // Sort arrivals by expected arrival time ascending
  arrivals.sort((a, b) => new Date(a.expectedArrival) - new Date(b.expectedArrival));

  // Gather platform counts for debug
  const platformCounts = {};

  arrivals.forEach(arrival => {
    const platform = arrival.platformName || 'N/A';
    platformCounts[platform] = (platformCounts[platform] || 0) + 1;
  });

  console.log('Platforms and counts:', platformCounts);

  // Display each arrival as before
  arrivals.forEach(arrival => {
    const card = document.createElement('div');
    card.classList.add('arrival-card');

    const arrivalTime = new Date(arrival.expectedArrival).toLocaleTimeString('en-UK', {
      hour: '2-digit',
      minute: '2-digit'
    });

    card.innerHTML = `
      <strong>Line:</strong> ${arrival.lineName}<br>
      <strong>Platform:</strong> ${arrival.platformName || 'N/A'}<br>
      <strong>Destination:</strong> ${arrival.destinationName}<br>
      <strong>Expected:</strong> ${arrivalTime}
    `;

    container.appendChild(card);
  });
}


function displayMessage(text) {
  const container = document.getElementById('results');
  container.innerHTML = `<div class="arrival-card">${text}</div>`;
}
