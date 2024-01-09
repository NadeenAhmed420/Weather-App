const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIKey = "05ca55fc9b64b008b0947a54335bb41c";
  const city = document.querySelector(".search-box input").value;

  if (city == "");
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
  )
    .then((Response) => Response.json())
    .then((json) => {
      console.log(json); //contain all the data (json file)

      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temp = document.querySelector(".weather-box .temp");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;

          case "Clouds":
            image.src = "images/cloud.png";
            break;

          case "Snow":
            image.src = "images/snow.png";
            break;

          case "Rain":
            image.src = "images/rain.png";
            break;

          case "Mist":
            image.src = "images/mist.png";
            break;

          case "Haze":
            image.src = "images/mist.png";
            break;

          default:
            image.src = "images/cloud.png";
        }

        temp.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${Math.round(json.wind.speed)}Km/h`;

     
      }
    });
});
