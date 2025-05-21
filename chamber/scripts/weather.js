// === WEATHER DATA FOR TEGUCIGALPA ===
// Coordinates: 14.0615, -87.1731
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=14.0615&lon=-87.1731&units=metric&cnt=24&appid=cf1ac3526fc5ea3345902e1b7cf5e72f`;
const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const caption = document.querySelector("figcaption");
const forecastContainer = document.getElementById("forecast");

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw Error(await response.text());
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Weather API Error:", error);
  }
}

function displayWeather(data) {
  // === Current Weather ===
  const now = data.list[0];
  currentTemp.innerHTML = `${now.main.temp.toFixed(1)}&deg;C`;
  const iconSrc = `https://openweathermap.org/img/w/${now.weather[0].icon}.png`;
  const desc = now.weather[0].description;
  weatherIcon.src = iconSrc;
  weatherIcon.alt = desc;
  caption.textContent = desc;

  // === 3-Day Forecast ===
  forecastContainer.innerHTML = "";
  const daily = {};

  // Group by day
  data.list.forEach(entry => {
    const date = new Date(entry.dt_txt);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    if (!daily[day]) {
      daily[day] = entry;
    }
  });

  const days = Object.keys(daily).slice(1, 4); // next 3 days
  days.forEach(day => {
    const temp = daily[day].main.temp.toFixed(1);
    forecastContainer.innerHTML += `<div><strong>${day}:</strong> ${temp}&deg;C</div>`;
  });
}

fetchWeather();
