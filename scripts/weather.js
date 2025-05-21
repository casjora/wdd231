const temp = document.getElementById("current-temp");
const icon = document.getElementById("weather-icon");
const captionDesc = document.querySelector("figcaption");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.63&units=metric&appid=cf1ac3526fc5ea3345902e1b7cf5e72f";

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


function displayResults(data) {
  temp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  icon.setAttribute('src', iconsrc);
  icon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}

apiFetch();