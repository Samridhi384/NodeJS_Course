//we will fetch api data through node and this time only we are using fetch

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// require("dotenv").config();

// const port = process.env.PORT || 3000;

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "from js";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "LOADING....";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          //   console.log(data.error);
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast.Weather;
        }
      });
    }
  );
});

const $sendLocationButton = document.querySelector("#send-location");

$sendLocationButton.addEventListener("click", function () {
  if (!navigator.geolocation) {
    messageOne.textContent = "Geolocation is not supported by your browser.";
  } else {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      messageOne.textContent = "LOADING....";
      messageTwo.textContent = "";

      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.TOKEN}`
      ).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            //   console.log(data.error);
            messageOne.textContent = data.error;
          } else {
            messageOne.textContent = data.name;

            let sunriseTime = new Date(
              data.sys.sunrise * 1000
            ).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            messageTwo.textContent = `Weather description: ${data.weather[0].description} and Temperature: ${data.main.temp}°C but feels like ${data.main.feels_like}°C.\n\nSunrise: ${sunriseTime} 🌞`;
          }
          console.log(data);
        });
      });
    });
  }
});
