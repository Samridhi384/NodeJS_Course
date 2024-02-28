const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast_cb");
const geoCode = require("./utils/geocode_cb");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Samridhi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpText",
    name: "Siya",
  });
});

// app.get("/about", (req, res) => {
//   res.send([
//     {
//       name: "sam",
//     },
//     {
//       name: "riya",
//     },
//   ]);
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Beach",
    name: "Sylvie",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    error: "Help article not found",
    name: "sam",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a addresss term!",
    });
  }

  forecast(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      geoCode(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "It is snowing",
  //   location: "India",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("*", (req, res) => {
  // * is a wildcard character means for all i.e. everything matches
  res.render("404", { title: "404", error: "My 404 Page", name: "sam" });
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
