import { COORDS, TIMEZONE, OWM_API_KEY, OWM_UNITS } from './weatherConfig.mjs';
import { fetchData, formatUnixToDateTimeStrings } from './weatherUtilities.mjs';

const forecastContainer = document.querySelector("#forecast");

const FORECAST_INTERVAL_COUNT = 24;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${COORDS.lat}&lon=${COORDS.lon}&units=${OWM_UNITS}&appid=${OWM_API_KEY}&cnt=${FORECAST_INTERVAL_COUNT}`;


function displayForecast(data) {
    if (!forecastContainer) {
        console.error("Forecast container '#forecast' not found in the DOM. Cannot display forecast.");
        return;
    }
    console.log(data);
    forecastContainer.innerHTML = '';

    if (!data.list || data.list.length === 0) {
        forecastContainer.innerHTML = '<p>Forecast data is currently unavailable.</p>';
        return;
    }

    const groupedByDate = {};

    data.list.forEach(item => {
        const dateStr = new Date(item.dt * 1000).toLocaleDateString("en-CA", { timeZone: TIMEZONE });
        if (!groupedByDate[dateStr]) {
            groupedByDate[dateStr] = [];
        }
        groupedByDate[dateStr].push(item);
    });

    const forecastDays = Object.keys(groupedByDate).slice(0, 3);

    const itemsGrid = document.createElement('div');
    itemsGrid.classList.add('forecast-items-grid');

    forecastDays.forEach(dateStr => {
        const dayData = groupedByDate[dateStr];
        const temps = dayData.map(d => d.main.temp);
        const avgTemp = (temps.reduce((sum, val) => sum + val, 0) / temps.length).toFixed(1);

        const midIndex = Math.floor(dayData.length / 2);
        const icon = dayData[midIndex].weather[0].icon;
        const description = dayData[midIndex].weather[0].description;
        const displayIconUrl = `https://openweathermap.org/img/w/${icon}.png`;
        const displayDesc = description.charAt(0).toUpperCase() + description.slice(1);

        const { date: displayDate } = formatUnixToDateTimeStrings(dayData[0].dt, TIMEZONE);

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('forecast-item');

        itemDiv.innerHTML = `
            <p class="forecast-date">${displayDate}</p>
            <img class="forecast-icon" src="${displayIconUrl}" alt="${displayDesc}" title="${displayDesc}">
            <p class="forecast-temp">${avgTemp}&deg;C</p>
            <p class="forecast-desc">${displayDesc}</p>
        `;

        itemsGrid.appendChild(itemDiv);
    });

    forecastContainer.appendChild(itemsGrid);
}

async function initForecast() {
    if (!forecastContainer) {
        console.warn("Forecast container '#forecast' not found. Skipping forecast.");
        return;
    }

    try {
        const forecastData = await fetchData(forecastUrl);
        displayForecast(forecastData);
    } catch (error) {
        forecastContainer.innerHTML = "<p>Could not load the weather forecast at this time. Please try again later.</p>";
    }
}

initForecast();