function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let span = document.querySelector("span");
  let roundWind = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#current-date");

  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);

  h1.innerHTML = `${response.data.name}`;
  span.innerHTML = `${temperature}`;
  document.querySelector(
    "#humidityNumber"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#windSpeed").innerHTML = `${roundWind}km/h`;
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "6ac62a7309c374961c1fdca5523c8afa";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
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

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", displayCelsius);

let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", getCurrentPosition);

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", handleSubmit);

search("Los Angeles");
