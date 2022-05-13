function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateToday = document.querySelector("#current-date");
let currentTime = new Date();

dateToday.innerHTML = formatDate(currentTime);

//////////conversion

function convertCelsius(event) {
  event.preventDefault();

  let mainTemp = document.querySelector("#main-temp");
  let temperature = mainTemp.innerHTML;
  temperature = Number(temperature);
  mainTemp.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiusTemperature = document.querySelector("#celsius-temp");
celsiusTemperature.addEventListener("click", convertCelsius);

function convertFahrenheit(event) {
  event.preventDefault();

  let mainTemp = document.querySelector("#main-temp");
  let temperature = mainTemp.innerHTML;
  temperature = Number(temperature);
  mainTemp.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitTemperature = document.querySelector("#fahrenheit-temp");
fahrenheitTemperature.addEventListener("click", convertFahrenheit);

///

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let span = document.querySelector("span");
  let temperature = Math.round(response.data.main.temp);
  span.innerHTML = `${temperature}`;
  document.querySelector(
    "#humidityNumber"
  ).innerHTML = `${response.data.main.humidity}%`;
  let roundWind = Math.round(response.data.wind.speed);
  document.querySelector("#windSpeed").innerHTML = `${roundWind}km/h`;
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "6ac62a7309c374961c1fdca5523c8afa";
  let city = document.querySelector("#search-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function retrievePosition(position) {
  let apiKey = "6ac62a7309c374961c1fdca5523c8afa";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", getCurrentPosition);

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", searchCity);
