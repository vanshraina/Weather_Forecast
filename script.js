const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const city1 = document.getElementById('city');
const visibility = document.getElementById('visibility');
const api_key = "4b83d897e9844fddfbd4f9a272ee294c";
const weatherCardsDiv = document.querySelector(".forecast-card");

const createWeatherCard = (weatherItem) => {
    return `<div class="day-card">
                <div class="day-date">
                    <p class="Date2">${weatherItem.dt_txt.split(" ")}</p>
                </div>
                <div class="temp-icon">
                    <h1 class="temp2">${(weatherItem.main.temp-273.15).toFixed(2)}<sup>oC</sup></h1>
                    <img class="weather-img2" src="${weatherItem.weather[0].icon}.png">
                </div>
            </div>`;
        
}

const getWeatherDetails = (cityName, lat, lon) =>
{
    const weather_data_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
    fetch(weather_data_url).then(response => response.json()).then(data => {
        
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        console.log(fiveDaysForecast);
            weatherCardsDiv.innerHTML = "";
            fiveDaysForecast.forEach(weatherItem => { 
                weatherCardsDiv.insertAdjacentHTML("beforeend" ,createWeatherCard(weatherItem));
                
        }); 
    }).catch(() => {
        alert("An error  occured");
    });
}

const getCityCoordinates = () => {
    const cityName = inputBox.value.trim();
    const geocoding_api_url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(geocoding_api_url).then(response => response.json()).then(data => {   
        const { name, lat, lon} = data[0];
        getWeatherDetails(name, lat, lon);
    });
}

//The fetch function returns a promise that resolves to the response from the server.
async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());
    temp.innerHTML =  `${Math.round(weather_data.main.temp-273.15)}`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}% `;
    pressure.innerHTML = `${weather_data.main.pressure}hPa `;
    visibility.innerHTML =  `${weather_data.visibility/1000}km`;
    city1.innerHTML = `${weather_data.name}`;
    
    if(weather_data.weather[0].main == "Clouds")
    {
        weather_img.src = "clouds.png";
    }
    else if(weather_data.weather[0].main == "Clear")
    {
        weather_img.src = "clear.png";
    }
    
    if(weather_data.weather[0].main == "Rain")
    {
        weather_img.src ="rain.png";
    }
    else if(weather_data.weather[0].main == "Drizzle")
    {
        weather_img.src ="drizzle.png";
    }
    else if(weather_data.weather[0].main == "Mist")
    {
        weather_img.src ="mist.png";
    }
    getCityCoordinates();
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

