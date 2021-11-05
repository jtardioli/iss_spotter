
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body);
 
  return request(`https://api.freegeoip.app/json/${data.ip}?apikey=75f6fb10-3db0-11ec-b9f9-fb610af8464f`);
};

const fetchISSFlyOverTimes = function(body) {
  const loc = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${loc.latitude}&lon=${loc.longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const {response} = JSON.parse(data);
      return response;
    });
};


module.exports = { nextISSTimesForMyLocation };