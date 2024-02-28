//using callback
const request = require("postman-request");
require("dotenv").config();

const geoCode = (latitude, longitude, callback) => {
  const url = `
  https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.TOKEN}&units=metric`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location service", undefined);
    } else if (body.message) {
      callback("Unable to find location", undefined);
    } else {
      let sunriseTime = new Date(body.sys.sunrise * 1000).toLocaleTimeString(
        "en-US",
        { hour: "2-digit", minute: "2-digit", hour12: true }
      );
      console.log(sunriseTime);
      callback(undefined, {
        Weather: `Weather description: ${body.weather[0].description} and Temperature: ${body.main.temp}°C but feels like ${body.main.feels_like}°C.\n\nSunrise: ${sunriseTime} 🌞`,
      });
    }
  });
};

// geoCode(18.521428, 73.8544541, (error, data) => {
//   console.log(`Error: ${error} and`, " data : ", data);
// });

module.exports = geoCode;
