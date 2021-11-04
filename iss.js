const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const data = JSON.parse(body);
      callback(null ,data.ip);
    }

  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=75f6fb10-3db0-11ec-b9f9-fb610af8464f`, function(error, response, body) {
    if (error) {
      callback(error);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      let data = JSON.parse(body);
      data = {latitude: data.latitude, longitude: data.longitude};
      callback(null ,data);
    }

  });
};

const fetchISSFlyOverTimes = (loc, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${loc.latitude}&lon=${loc.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `The status code was ${response.statusCode}. YIKES 😬`;
      callback(Error(msg), null);
    } else {
      let data = JSON.parse(body);
      callback(null, data.response);
    }


  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        
        callback(err, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (err, times) => {
        if (err) {
          console.log('hi');
          callback(err, null);
          return;
        }
        callback(null, times);
      });
    });
  });

};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

