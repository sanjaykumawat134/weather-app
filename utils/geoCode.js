const request = require("request");
const geoCode = (address, callback) => {
  const geoCodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
   encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FuamF5a3VtYXdhdCIsImEiOiJja3FucW40eXQxaGh4Mm5ueDNkN3o3Zm5jIn0.Ww7Eba44UOBC_Nxl4WdJ3A&limit=1";
  request({ url: geoCodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect geolocation services", undefined);
    } else if (response.body.features.length == 0) {
      callback(
        "Unable to find location please try with different term...",
        undefined
      );
    } else {
      // const lat = response.body.features[0].center[1];
      // const long = response.body.features[0].center[0];
      callback(undefined, {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        place: response.body.features[0].place_name,
      });
    }
  });
};


module.exports = {

  geoCode: geoCode,
};
