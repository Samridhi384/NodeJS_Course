const { error } = require("console");
const https = require("https");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=927c467776cde6a17ae1632d4c9c8dac";

const request = https.request(url, (response) => {
  let data = " ";

  response.on("data", (chunks) => {
    data = data + chunks.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log(error);
});

request.end();
