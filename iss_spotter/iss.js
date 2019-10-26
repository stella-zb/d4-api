// function that retrieve the user's IP address.
const request = require('request');
const fetchMyIP = (callback) => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`St atus Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};

// function takes in an IP address and returns the latitude and longitude
const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
    } else {
      const coords = JSON.parse(body).data;
      callback(null, coords);
    }
  });
};

// function that retrieve upcoming ISS fly over times for the given latitude and longitude
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    } else {
      const ISSFlyOverTimes = JSON.parse(body).response;
      callback(null, ISSFlyOverTimes);
    }
  });
};


// Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, ISSFlyOverTimes) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, ISSFlyOverTimes);
      });
    });
  });
};

// module.exports = { fetchMyIP };
// module.exports = { fetchCoordsByIP };
// module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };