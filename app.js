const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "f00839d78e1254228f05bdad1fa805f2";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=imperial";

  https.get(url, function(response) {
    console.log("Status Code: " + response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(weatherDescription);
      console.log(icon);
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees fahrenheit with " + weatherDescription + ".</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });

  });
});

app.listen(3000, function() {
  console.log("Local Server on 3000");
});
