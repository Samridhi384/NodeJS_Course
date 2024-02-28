const { error } = require("console");
const request = require("postman-request");
const geoCode = require("./utils/geocode_cb");
const forecast = require("./utils/forecast_cb");

// const url =
//   //   `https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=${process.env.TOKEN}&units=metric`;

//   //   `https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=${process.env.TOKEN}`;

//   `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${process.env.TOKEN}`;

// request({ url: url, json: true }, (error, response) => {
//   //   const data = JSON.parse(response.body);
//   //   console.log(response.body);
//   //   if (error) {
//   //     console.log("Unable to connect location");
//   //   } else if (response.body.message) {
//   //     console.log("Unable to find");
//   //   } else {
//   //     console.log(
//        // `Weather description : ${response.body.weather[0].description} and so Temperature : ${response.body.main.temp} K but feels like ${response.body.main.feels_like} K`
//   //     );
//   //   }
// });

// //geocoding

// const geocodeUrl =
//   `http://api.openweathermap.org/geo/1.0/direct?q=Pune,IN&limit=5&appid=${process.env.TOKEN}`;

// //reverse geocoding

// //   `http://api.openweathermap.org/geo/1.0/reverse?lat=18.521428&lon=73.8544541&appid=${process.env.TOKEN}`;

// //   `http://api.openweathermap.org/geo/1.0/zip?zip=395007,IN&appid=${process.env.TOKEN}`;

// request({ url: geocodeUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect location services");
//   } else if (response.body.length === 0) {
//     console.log("Unable to find location");
//   } else {
//     const latitude = response.body[0].lat;
//     const longitude = response.body[0].lon;
//     console.log(latitude, longitude);
//   }
//   //   console.log(response.body);
// });

const address = process.argv[2];

if (!address) {
  console.log("Please provide address");
} else {
  forecast(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.log(error);
    }

    // console.log(`Error: ${error} and`, " data : ", data);

    geoCode(latitude, longitude, (error, forecastdata) => {
      if (error) {
        console.log(error);
      }
      console.log(location);
      console.log(" data : ", forecastdata);
    });
  });
}
