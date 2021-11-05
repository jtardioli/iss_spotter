const {nextISSTimesForMyLocation} = require('./iss_promised');
const printPasstimes = (passArray) => {
  for (let time of passArray) {
    const seconds = time.duration;
    const myDate = new Date(time.risetime).toString('en-GB',{timeZone:'EST'});
    console.log(`Next pass at ${myDate} for ${seconds} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(passtimes => printPasstimes(passtimes))
  .catch((error) => {
    console.log("It didn't work :(, ", error);
  });

