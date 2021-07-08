const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geoCode } = require("./utils/geoCode");
const { forecast } = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'));
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname + "../../templates/views");
const partialsPath = path.join(__dirname + "../../templates/partials");
//register the route
//web-servers\templates
// console.log("path is" ,path.join(__dirname + "../../templates/views"));
app.set("views", viewsPath);
app.set("view engine", "hbs");
app.use(express.static(publicDirPath));
hbs.registerPartials(partialsPath);
// app.get("", (req, res) => {
//   //    res.send('Hello world ... Getting started with express....')
//   res.send("<h1>welcome to the weather app...</h1>");
// });

// app.get("/about", (req, res) => {
//   res.send("About us page");
// });
// app.get("/contact", (req, res) => {
//   res.send("contact us page");
// });
// app.get("/help", (req, res) => {
//   // res.se{nd("help us page")
//   res.send({
//     name: "john doe",
//     age: 40,
//     place: "america",
//   });
// });
app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "weather app",
    author: "john doe",
  });
});
app.get("/weather", (req, res) => {
  //   res.send("your weather");
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geoCode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, long, (error, foreCastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: foreCastData,
        location,
        address: req.query.address,
      });
    });
  });
  // res.send({
  //   title: "weather",
  //   forecast: "It is snowing",
  //   location: req.query.address,
  // });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "john doe",
    age: 18,
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    message: "I am always here to help you...",
  });
});
app.get("/help/*", (req, res) => {
  // res.send("Help article not found");
  res.render("404", {
    title: "error",
    name: "john doe",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  // res.send("404 page not found");
  res.render("404", {
    title: "error",
    name: "john doe",
    errorMessage: "something happened wrong",
  });
});
//configure server
app.listen(port, () => {
  console.log("Server started...");
});
