
const { nextISSTimesForMyLocation } = require('./iss');

// Test Code for nextISSTimesForMyLocation
const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`)
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');

// Test Code for fetchMyIP
// fetchMyIP((error, ip) => {
//   if (error) {
//     return console.log("It didn't work!" , error);
//   } else {
//     console.log('It worked! Returned IP:' , ip);
//   }
// });

// Test Code for fetchCoordsByIP with giving ip
// fetchCoordsByIP('162.245.144.188', (error, coords) => {
//   if (error) {
//     return console.log("It didn't work!" , error);
//   } else {
//     console.log(`It worked! Returned Coords: { latitude: '${coords.latitude}', longitude: '${coords.longitude}' }`);
//   }
// });

// Test Code for fetchISSFlyOverTimes with giving latitude and longitude
// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, ISSFlyOverTimes) => {
//   if (error) {
//     return console.log("It didn't work!" , error);
//   } else {
//     console.log(`It worked! Returned flyover times:`, ISSFlyOverTimes);
//   }
// });

