import { COORDS, TIMEZONE, OWM_API_KEY, OWM_UNITS } from './weatherConfig.mjs';
import { fetchData, formatUnixToDateTimeStrings } from './weatherUtilities.mjs';

const forecastContainer = document.querySelector("#forecast");

const FORECAST_INTERVAL_COUNT = 3;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${COORDS.lat}&lon=${COORDS.lon}&units=${OWM_UNITS}&appid=${OWM_API_KEY}&cnt=${FORECAST_INTERVAL_COUNT}`;


function displayForecast(data) {
    if (!forecastContainer) {
        console.error("Forecast container '#forecast' not found in the DOM. Cannot display forecast.");
        return;
    }
    console.log(data);
    forecastContainer.innerHTML = '';

    if (data.list && data.list.length > 0) {
        const itemsGrid = document.createElement('div');
        itemsGrid.classList.add('forecast-items-grid'); // For CSS styling (e.g., using grid or flex)

        data.list.forEach(forecastItem => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('forecast-item'); // For styling individual forecast entries

            // Format the Unix timestamp to readable date and time strings using the specified timezone
            const { date: displayDate, time: displayTime } = formatUnixToDateTimeStrings(forecastItem.dt, TIMEZONE);

            const temp = `${forecastItem.main.temp}&deg;C`; // Temperature
            const icon = forecastItem.weather[0].icon;
            const iconsrc = `https://openweathermap.org/img/w/${icon}.png`; // Weather icon URL
            let description = forecastItem.weather[0].description;
            description = description.charAt(0).toUpperCase() + description.slice(1); // Capitalize the description

            // Create the HTML structure for each forecast item
            itemDiv.innerHTML = `
                <p class="forecast-date">${displayDate}</p>
                <p class="forecast-time">${displayTime}</p>
                <img class="forecast-icon" src="${iconsrc}" alt="${description}" title="${description}">
                <p class="forecast-temp">${temp}</p>
                <p class="forecast-desc">${description}</p>
            `;
            itemsGrid.appendChild(itemDiv);
        });
        forecastContainer.appendChild(itemsGrid);

    } else if (data.message) {
        // Handle API error messages if present in the response body (e.g., invalid API key)
        console.error(`Forecast API message: ${data.message}`);
        forecastContainer.innerHTML = `<p>Forecast data unavailable: ${data.message}</p>`;
    } else {
        // Fallback for no data or other unexpected issues
        forecastContainer.innerHTML = '<p>Forecast data is currently unavailable.</p>';
    }
}

/**
 * Initializes the forecast module: fetches data and displays it.
 */
async function initForecast() {
    if (!forecastContainer) {
        // If the main container isn't on the page, don't bother fetching.
        // This can happen if this script is loaded on pages without the #forecast div.
        console.warn("Forecast container '#forecast' not found. Forecast module will not initialize.");
        return;
    }
    try {
        const forecastData = await fetchData(forecastUrl);
        // console.log('Forecast data:', forecastData); // Uncomment for debugging
        displayForecast(forecastData);
    } catch (error) {
        // Error is already logged by fetchData utility.
        // Display a user-friendly message in the forecast section.
        if (forecastContainer) {
            forecastContainer.innerHTML = "<p>Could not load the weather forecast at this time. Please try again later.</p>";
        }
        // The error is re-thrown by fetchData, so it might be caught by a global error handler if one exists.
    }
}

// Automatically initialize the forecast when the script is loaded and parsed as a module
initForecast();