//using callback
const request = require("postman-request");

const geoCode = (latitude, longitude, callback) => {
  const url = `
  https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=927c467776cde6a17ae1632d4c9c8dac`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location service", undefined);
    } else if (body.message) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        weather: `Weather description : ${body.weather[0].description} and so Temperature : ${body.main.temp} K but feels like ${body.main.feels_like} K`,
      });
    }
  });
};

// geoCode(18.521428, 73.8544541, (error, data) => {
//   console.log(`Error: ${error} and`, " data : ", data);
// });

module.exports = geoCode;
