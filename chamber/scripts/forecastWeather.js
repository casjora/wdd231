import { COORDS, TIMEZONE, OWM_API_KEY, OWM_UNITS } from './weatherConfig.mjs';
import { fetchData, formatUnixToDateTimeStrings } from './weatherUtilities.mjs';

const forecastContainer = document.querySelector("#forecast");
const FORECAST_INTERVAL_COUNT = 24;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${COORDS.lat}&lon=${COORDS.lon}&units=${OWM_UNITS}&appid=${OWM_API_KEY}&cnt=${FORECAST_INTERVAL_COUNT}`;

function displayForecast(data) {
  if (!forecastContainer) return;

  forecastContainer.innerHTML = '';
  if (!data.list || data.list.length === 0) {
    forecastContainer.innerHTML = '<p>Forecast data is currently unavailable.</p>';
    return;
  }

  const grouped = {};

  data.list.forEach(item => {
    const dateStr = new Date(item.dt * 1000).toLocaleDateString("en-CA", { timeZone: TIMEZONE });
    (grouped[dateStr] ||= []).push(item);
  });

  const forecastDays = Object.keys(grouped).slice(0, 3);
  const itemsGrid = document.createElement('div');
  itemsGrid.classList.add('forecast-items-grid');

  forecastDays.forEach(dateStr => {
    const dayData = grouped[dateStr];
    const temps = dayData.map(d => d.main.temp);
    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);

    const { icon, description } = dayData[Math.floor(dayData.length / 2)].weather[0];
    const { date } = formatUnixToDateTimeStrings(dayData[0].dt, TIMEZONE);
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    const descText = description.charAt(0).toUpperCase() + description.slice(1);

    itemsGrid.innerHTML += `
      <div class="forecast-item">
        <p class="forecast-date">${date}</p>
        <img class="forecast-icon" src="${iconUrl}" alt="${descText}" title="${descText}">
        <p class="forecast-temp">${avgTemp}&deg;C</p>
        <p class="forecast-desc">${descText}</p>
      </div>
    `;
  });

  forecastContainer.appendChild(itemsGrid);
}

async function initForecast() {
  try {
    const forecastData = await fetchData(forecastUrl);
    displayForecast(forecastData);
  } catch {
    forecastContainer.innerHTML = "<p>Could not load the weather forecast at this time.</p>";
  }
}

initForecast();
