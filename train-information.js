/**
this is currently just a note

function callStation(location) {
    const response = fetch(`https://api.tfl.gov.uk/Line/${location}/Arrivals`, {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',}
        })
        .then(response => {
            console.log(response.status);
            console.log(response.text());
        })
        .catch(err => console.error(err));

    return response;
}

**/
