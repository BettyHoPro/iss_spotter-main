const request = require("request");


// === ISS Spotter I === //
const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

// === ISS Spotter II === //
const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) return callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);

    const  { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};
// const ip = "173.180.15.1";
// const coords = { latitude: '49.27670', longitude: '-123.13000' };
// === ISS Spotter III === //
const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) return callback(Error(`Status Code ${response.statusCode} when fetching ISS. pass time: ${body}`), null);

    const  pass = JSON.parse(body).response;
    callback(null, pass);
  });
};

// === ISS Spotter IV === //
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) return callback(error, null);
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) return callback(error, null);
        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };

