const request = require("request");

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
    const jsonIp = JSON.parse(body).ip;
    callback(null, jsonIp);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) return callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    const  { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};
module.exports = { fetchMyIP, fetchCoordsByIP };