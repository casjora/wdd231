import { COORDS, TIMEZONE, OWM_API_KEY, OWM_UNITS } from './weatherConfig.mjs';
import { fetchData, formatUnixToTimeString } from './weatherUtilities.mjs';

const tempEl = document.getElementById("current-temp");
const iconEl = document.getElementById("weather-icon");
const captionEl = document.querySelector("figcaption");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");
const humidityEl = document.getElementById("humidity");
const feelingEl = document.getElementById("feeling");
const highEl = document.getElementById("high");
const lowEl = document.getElementById("low");

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${COORDS.lat}&lon=${COORDS.lon}&units=${OWM_UNITS}&appid=${OWM_API_KEY}`;

function displayCurrentWeather(data) {
  if (!tempEl || !iconEl || !captionEl) return;

  const weather = data.weather[0];
  const main = data.main;
  const sys = data.sys;

  tempEl.innerHTML = `${main.temp.toFixed(1)}&deg;C`;
  feelingEl.innerHTML = `Feeling: ${main.feels_like.toFixed(1)}&deg;C`;
  highEl.innerHTML = `Max Temp: ${main.temp_max.toFixed(1)}&deg;C`;
  lowEl.innerHTML = `Min Temp: ${main.temp_min.toFixed(1)}&deg;C`;
  humidityEl.innerHTML = `Humidity: ${main.humidity}%`;
  sunriseEl.innerHTML = `Sunrise: ${formatUnixToTimeString(sys.sunrise, TIMEZONE)}`;
  sunsetEl.innerHTML = `Sunset: ${formatUnixToTimeString(sys.sunset, TIMEZONE)}`;

  const desc = weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
  iconEl.setAttribute('src', `https://openweathermap.org/img/w/${weather.icon}.png`);
  iconEl.setAttribute('alt', desc);
  captionEl.textContent = desc;
}

async function initCurrentWeather() {
  try {
    const data = await fetchData(currentUrl);
    displayCurrentWeather(data);
  } catch (error) {
    if (captionEl) captionEl.textContent = "Could not load current weather.";
    console.error("Failed to load current weather:", error);
  }
}

initCurrentWeather();
