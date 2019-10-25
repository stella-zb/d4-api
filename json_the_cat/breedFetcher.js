const request = require('request');

const fetchBreedDescription = (breedName, callback) => {
  request(`https://api.thecatapi.com/v1/breeds/search/?q=${breedName}`, (error, response, body) => {
    if (body === '[]') {
      callback(null, "Not found");
    } else if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      callback(data[0].description, null);
    } else {
      callback(null, error);
    }
  });
};

module.exports = { fetchBreedDescription };
