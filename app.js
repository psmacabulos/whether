const express = require('express');
const axios = require('axios');
const { json } = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

app.post('/', (req, res) => {
  let city = req.body.cityName;
  let units = ['metric', 'imperial'];
  const apiKey = `0bd4cb696e7c3a741ce95734125965fe`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units[0]}&appid=${apiKey}`;

  axios.get(apiEndpoint).then((response) => {
    const weatherData = response.data;
    let temp = weatherData.main.temp;
    let feelsLike = weatherData.main.feels_like;
    let weatherDesc = weatherData.weather[0].description;
    let location = weatherData.name;
    let icon = weatherData.weather[0].icon;
    let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    res.write(
      `<p>The weather is currently ${weatherDesc} here in ${location}</p>`
    );
    res.write(` <h1>The temperature now is ${temp} deg Celcious</h1>`);
    res.write(`<img src=${iconURL}>`);
    res.send();
  });
});

app.listen(4000, () => {
  console.log('Server now running');
});
