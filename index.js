const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error !== null) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
//   myIP = ip
// });

// fetchCoordsByIP(myIP, (data, error) => {
//   if (error !== null) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coordinates are:' , data);
//   myCoordinates = data
// });


// fetchISSFlyOverTimes({ latitude: '49.3167', longitude: '-122.7384' }, (data, error) => {
//     if (error !== null) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned rising times are:' , data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
