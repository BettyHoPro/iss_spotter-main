//const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require('./iss');
//const { fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require("./iss");

// === ISS Spotter I === //
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// === ISS Spotter II === //
// fetchCoordsByIP("173.180.15.1", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:' , coordinates);
// });

// === ISS Spotter III === //
//const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes)=>{
//   if (error) return console.log("It didn't work!" , error);

//   console.log('It worked! Returned flyover times:' , passTimes);
// });

// === ISS Spotter IV === //
const printPassTimes = (passTimes) => {
  passTimes.forEach(pass => {
    //console.log(pass);
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    // const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${pass.duration} seconds!`);
  });

};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) return console.log("It didn't work!" , error);

  printPassTimes(passTimes);
});

