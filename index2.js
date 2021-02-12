const {nextISSTimesForMyLocation} = require('./iss_promised');

const printPassTimes = (passTimes) => {
  passTimes.forEach(pass => {
    //console.log(pass);
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${dateTime} for ${pass.duration} seconds!`);
  });
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

 