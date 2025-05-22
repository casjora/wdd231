import { COORDS, TIMEZONE, OWM_API_KEY, OWM_UNITS } from './weatherConfig.mjs';
import { fetchData, formatUnixToTimeString } from './weatherUtilities.mjs';

const tempEl = document.getElementById("current-temp");
const iconEl = document.getElementById("weather-icon");
const captionDescEl = document.querySelector("figcaption");
const sunriseEl = document.querySelector("#sunrise");
const sunsetEl = document.querySelector("#sunset");
const humidEl = document.querySelector("#humidity");
const feelingEl = document.querySelector('#feeling');
const highEl = document.querySelector('#high');
const lowEl = document.querySelector('#low');


const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${COORDS.lat}&lon=${COORDS.lon}&units=${OWM_UNITS}&appid=${OWM_API_KEY}`;

function displayCurrentWeather(data) {
    if (!tempEl || !iconEl || !captionDescEl ) {
        console.error("One or more DOM elements for current weather not found.");
        return;
    }
    tempEl.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    iconEl.setAttribute('src', iconsrc);
    iconEl.setAttribute('alt', desc);
    captionDescEl.textContent = desc;
    console.log(data);
    feelingEl.innerHTML = `Feeling: ${data.main.feels_like.toFixed(1)}&deg;C`;
    highEl.innerHTML = `Max Temp: ${data.main.temp_max.toFixed(1)}&deg;C`;
    lowEl.innerHTML = `Min Temp: ${data.main.temp_min.toFixed(1)}&deg;C`;
    humidEl.innerHTML = `Humidity: ${data.main.humidity}%`;
    sunriseEl.innerHTML = `Sunrise: ${formatUnixToTimeString(data.sys.sunrise, TIMEZONE)}`;
    sunsetEl.innerHTML = `Sunset: ${formatUnixToTimeString(data.sys.sunset, TIMEZONE)}`;
   
}

async function initCurrentWeather() {
    try {
        const data = await fetchData(currentUrl);
        displayCurrentWeather(data);
    } catch (error) {
        if (captionDescEl) captionDescEl.textContent = "Could not load current weather.";
        console.error("Failed to initialize current weather:", error);
    }
}

initCurrentWeather();