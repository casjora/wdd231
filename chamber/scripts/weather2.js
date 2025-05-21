const temp = document.getElementById("current-temp");
const icon = document.getElementById("weather-icon");
const captionDesc = document.querySelector("figcaption");
const highest = document.querySelector("#high");
const lowest = document.querySelector("#low");
const feels = document.querySelector("#feeling");
const humid = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const forecast = document.querySelector("#forecast");

const lat = 14.0818;
const long = -87.2068;
const apiId = "cf1ac3526fc5ea3345902e1b7cf5e72f";

//14.061540683408467, -87.17316778655234 Tegus

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiId}`;

async function apiFetch(){
    try {
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    }catch (error){
        console.log(error);
    }
}

function formatUnixTime(unixTime, timeZone = "America/Tegucigalpa") {
  return new Date(unixTime * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZone
  });
}

function displaySunriseSunset(data) {
  sunrise.innerHTML = `Sunrise: ${formatUnixTime(data.sys.sunrise)}`;
  sunset.innerHTML = `Sunset: ${formatUnixTime(data.sys.sunset)}`;
}

function displayResults(data) {
  temp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  icon.setAttribute('src', iconsrc);
  icon.setAttribute('alt', desc);
  captionDesc.textContent = `${(desc)}`;
  highest.innerHTML = `High: ${data.main.temp_max}&deg;C`;
  lowest.innerHTML = `Low: ${data.main.temp_min}&deg;C`;
  humid.innerHTML = `Humidity: ${data.main.humidity}%`;
  displaySunriseSunset(data);


}

apiFetch();