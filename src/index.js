function updateWeather(response) {
  console.log(response.data.condition.icon_url);
  let temperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temp");
  let weatherDescription = response.data.condition.description;
  let weatherDescriptionElement = document.querySelector(
    "#current-temp-description"
  );
  let currentCity = document.querySelector("#current-location-city");
  let feelsLike = `${Math.round(response.data.temperature.feels_like)}°`;
  let feelsLikeElement = document.querySelector("#weather-detail-feels");
  let humidity = `${response.data.temperature.humidity}%`;
  let humidityElement = document.querySelector("#weather-detail-humidity");
  let windSpeed = `${Math.round(response.data.wind.speed)}km/h`;
  let windElement = document.querySelector("#weather-detail-speed");

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#current-temp-icon");
  let icon = `<img
              src="${response.data.condition.icon_url}"
              class="current-temp-icon"
            />`;

  console.log(iconElement);

  currentCity.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  weatherDescriptionElement.innerHTML = weatherDescription;
  feelsLikeElement.innerHTML = feelsLike;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = windSpeed;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = icon;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "c0f7a728c0575391764t3b111d69od7f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  timeElement.innerHTML = formatDate(now);

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateCity);

function formattedDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div>
          <div class="weather-forecast-day">
            <span class="forecast-date">${formattedDay(day.time)}</span>
            <img
              class="forecast-icon"
              src=${day.condition.icon_url}
              class="current-temp-icon"
            />
            <span class="forecast-high-temp">${Math.round(
              day.temperature.maximum
            )}° </span>
            <span class="forecast-low-temp">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div>
          </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "c0f7a728c0575391764t3b111d69od7f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios(apiUrl).then(displayForecast);
}

function formatDate(date) {
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[day];

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  return `${currentDay}, ${currentHour}:${currentMinute}`;
}

let now = new Date();

let timeElement = document.querySelector("#current-time");

searchCity("Skæring");
