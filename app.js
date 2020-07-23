const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req, res) {

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=f00839d78e1254228f05bdad1fa805f2&units=imperial";

  https.get(url, function(response) {
    console.log("Status Code: " + response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      console.log(temp);
      console.log(weatherDescription);
      res.send("<h1>The temperature in Orlando is " + temp + " with " + weatherDescription + ".</h1>");
    });

  });
});


app.listen(3000, function() {
  console.log("Local Server on 3000");
});
