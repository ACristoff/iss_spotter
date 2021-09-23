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
    console.log(body)
    return body
  })
}

console.log(fetchMyIP())

module.exports = { fetchMyIP };


// var http = require('http');

// http.get({'host': 'api.ipify.org', 'port': 80, 'path': '?format=json'}, function(resp) {
//   resp.on('data', function(ip) {
//     console.log("My public IP address is: " + ip);
//   });
// });


// https://api64.ipify.org?format=json