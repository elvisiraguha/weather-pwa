import { apiKey } from "./config.js";
const searchBox = document.querySelector(".search-box  input");
const results = document.querySelector("section.results");

const handleData = (data) => {
  if (data.cod != "200") {
    searchBox.classList.remove("found");
    searchBox.classList.add("not-found");
    results.innerHTML = "";
  } else {
    const weather = data.weather[0];
    searchBox.classList.add("found");
    searchBox.classList.remove("not-found");
    results.innerHTML = `
    <div class="heading">
          <h3 class="name">${data.name}</h3>
          <img
            src="https://openweathermap.org/img/wn/${weather.icon}@2x.png"
            class="weather-icon"
            alt=""
          />
        </div>
        <div class="summary">
          <div class="weather-main">${weather.main}</div>
          <div class="weather-description">${weather.description}</div>
        </div>
        <div class="temperature">
          <div class="main-temp">Temp: ${data.main.temp}</div>
          <div class="main-temp_max">Max Temp: ${data.main.temp_max}</div>
          <div class="main-temp_mix">Min Temp: ${data.main.temp_min}</div>
        </div>
        <div class="wind">
          <div class="wind-speed">Wind Speed: ${data.wind.speed} </div>
          <div class="wind-deg">Wind Degree: ${data.wind.deg}</div>
        </div>`;
  }
};

searchBox.addEventListener("keyup", ({ target }) => {
  const value = target.value;
  const apiURL = "https://api.openweathermap.org/data/2.5/weather";
  const url = `${apiURL}?q=${value}&APPID=${apiKey}&units=metric`;

  setTimeout(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => handleData(data))
      .catch((err) => console.log(err));
  }, 1000);
});
