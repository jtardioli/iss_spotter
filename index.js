// index.js
const request = require('request');
const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  for (let time of passTimes) {
  
    const seconds = time.duration;
    const myDate = new Date(time.risetime).toString('en-GB',{timeZone:'EST'});

    console.log(`Next pass at ${myDate} for ${seconds} seconds!`);
  }

});







