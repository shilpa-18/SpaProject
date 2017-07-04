const axios = require('axios');

function getNearBySpas(lat, long) {
	console.log('LAT AND LONG FROM THE SERVICES: ')
	console.log(lat, long)
	const queryPromise = axios({
		url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=7000&types=spa&key=${process.env.API_KEY}`,
		method: 'GET'
	})
	
	return queryPromise;
}


module.exports = {getNearBySpas};