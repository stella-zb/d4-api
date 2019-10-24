const request = require('request');
const breedName = process.argv.slice(2);

request(`https://api.thecatapi.com/v1/breeds/search/?q=${breedName}`, (error, response, body) => {
  if (body === '[]') {
    console.log('Not Found');
  } else if (!error && response.statusCode === 200) {
    const data = JSON.parse(body);
    console.log(data[0].description);
  } else {
    console.error('error');
  }
});


