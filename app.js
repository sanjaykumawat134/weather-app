const request = require("request");
const { geoCode } = require("./utils/geoCode");
const { forecast } = require("./utils/forecast");

// const url =
//   "https://api.openweathermap.org/data/2.5/weather?q=udaipur&appid=c4eddcb46547960900ae285e34f33a33";

// request({ url: url, json: true }, (error, response) => {
//   // const data = JSON.parse(response.body);
//   // console.log(data);
//   if (error) {
//     console.log(
//       "something happended wrong",
//       "unable to connect weather service"
//     );
//   } else if (response.body.cod == 400 && response.body.message) {
//     console.log("unable to find location");
//   } else {
//     const data = response.body;
//   }
//   // console.log(data);
// });

// const geoCodeUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2FuamF5a3VtYXdhdCIsImEiOiJja3FucW40eXQxaGh4Mm5ueDNkN3o3Zm5jIn0.Ww7Eba44UOBC_Nxl4WdJ3A&limit=1";

// request({ url: geoCodeUrl, json: true }, (error, response) => {
//   //   console.log(response.body.features[0].center);
//   if(error){
//       console.log("unable to connect geolocation services...")
//   }else if(response.body.features.length ==0){
//         console.log("Unable to find location please try with different term....")
//   }else{
//       const lat = response.body.features[0].center[1];
//       const long = response.body.features[0].center[0];
//       console.log(lat, long);
//     }
// });
// console.log("enter a location as command line argument")
const address = process.argv[2];
if(!address){
    console.log("please provide a address...")
}else{
geoCode(address, (error, {lat,long,place}) => {
  if (error) {
    return console.log("Error", error);
  }
  forecast(lat, long, (error, forecastData) => {
    if (error) {
      return console.log("Error", error);
    }

    console.log(place);
    console.log("forecast data", forecastData);
  });
});
}