const request = require("request");
const forecast = (lat, long, callback) => {
  //   const url =
  // "https://api.openweathermap.org/data/2.5/weather?q=udaipur&appid=c4eddcb46547960900ae285e34f33a33";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=c4eddcb46547960900ae285e34f33a33";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect weather service", undefined);
    } else if (response.body.cod == 400 && response.body.message) {
      callback("unable to find location", undefined);
    } else {
      const data = response.body;
      let weather = data.weather[0].main;
      let weatherDiscription = data.weather[0].description;
      let temp = parseFloat(data.main.temp - 273.15).toPrecision(3);
      let max_temp = parseFloat(data.main.temp_max - 273.15).toPrecision(3);
      let min_temp = parseFloat(data.main.temp_min - 273.15).toPrecision(3);
      callback(
        undefined,
        "there is " +
          weather +
          " description " +
          weatherDiscription +
          " and temp is " +
          temp +
          " and max temp is " +
          max_temp +
          " and min temp is " +
          min_temp
      );
    }
  });
};

module.exports = {
  forecast: forecast,
};
