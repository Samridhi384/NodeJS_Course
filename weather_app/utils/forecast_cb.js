//using callback
const request = require("postman-request");

const forecast = (address, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${process.env.TOKEN}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location service", undefined);
    } else if (body.message) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        longitude: body.coord.lon,
        latitude: body.coord.lat,
        location: body.name,
      });
    }
  });
};

// forecast("Surat", (error, data) => {
//   console.log(`Error: ${error} and`, " data : ", data);
// });

module.exports = forecast;
