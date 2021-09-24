/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');



const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api64.ipify.org?format=json`, (error, response, body) => {
    // console.log(error)
    // console.log(body)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    if (error) {
      callback(error, null);
    }
    const ipObj = JSON.parse(body);
    callback(null, ipObj.ip);
  });
};


const fetchCoordsByIP = function(ipStr, callback) {
  request(`https://freegeoip.app/json/${ipStr}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const coordObj = JSON.parse(body);
    callback({'latitude' : `${coordObj.latitude}`, 'longitude' : `${coordObj.longitude}`}, null);
    // console.log('latitude ', coordObj.latitude, 'longitude ', coordObj.longitude)
  });
};


const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const riseObj = JSON.parse(body);

    callback(riseObj.response, null);
    // console.log(riseObj.response);
  });
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP (ip, (coords, error) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes (coords, (riseTimes, error) => {
        if (error) {
          console.log('BEEP')
          return callback(error, null)
        }
        

        // console.log(riseTimes[0].risetime)
        const riseDatesAll = []
        riseTimes.forEach(element => {
          // console.log(element)
          let date = new Date(element.risetime)
          "Date: "+date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()
          // " "+date.getHours()+
          // ":"+date.getMinutes()+
          // ":"+date.getSeconds()
          console.log(`The next pass is on ${date} for ${element.duration} seconds!`)
        })



        // console.log(riseDatesAll)  
        callback(null, riseDatesAll)
      });
    });
  });
};

// var timestamp = 1607110465663
// var date = new Date(timestamp);

// console.log("Date: "+date.getDate()+
//           "/"+(date.getMonth()+1)+
//           "/"+date.getFullYear()+
//           " "+date.getHours()+
//           ":"+date.getMinutes()+
//           ":"+date.getSeconds());



// console.log("Date: "+riseDates.getDate()+
//           "/"+(riseDates.getMonth()+1)+
//           "/"+riseDates.getFullYear()+
//           " "+riseDates.getHours()+
//           ":"+riseDates.getMinutes()+
//           ":"+riseDates.getSeconds());

// const array1 = ['a', 'b', 'c'];

// array1.forEach(element => console.log(element));

// // expected output: "a"
// // expected output: "b"
// // expected output: "c"


// const array1 = [1, 4, 9, 16];

// // pass a function to map
// const map1 = array1.map(x => x * 2);

// console.log(map1);
// // expected output: Array [2, 8, 18, 32]

// console.log(new Date(1632503089)) 


//var timestamp = 1607110465663
// var riseDates = new Date(timestamp);
// console.log(riseDates.getTime())
// console.log(riseDates)

// console.log("Date: "+riseDates.getDate()+
//           "/"+(riseDates.getMonth()+1)+
//           "/"+riseDates.getFullYear()+
//           " "+riseDates.getHours()+
//           ":"+riseDates.getMinutes()+
//           ":"+riseDates.getSeconds());

// fetchISSFlyOverTimes({ latitude: '49.3167', longitude: '-122.7384' })
// { latitude: 49.3167, longitude: -122.7384 }

// https://iss-pass.herokuapp.com/json/?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE

// https://freegeoip.app/{format}/{IP_or_hostname}


// req.end();
// console.log(fetchMyIP())

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

//const catObj = JSON.parse(body);
// var http = require('http');



// https://api64.ipify.org?format=json