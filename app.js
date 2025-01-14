const btn = document.querySelector('.btn');
const inputBox = document.querySelector('.input-box');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.desc');
const humidity = document.querySelector('.humidity-value');
const wind = document.querySelector('.wind-speed');
const weatherBody = document.querySelector('.weather-body');
const error = document.querySelector('.error');

async function checkWeather(city){
    const api_key = "868ee0e90cb4d9da5247b2309f277500";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data);

    if(weather_data.cod === `404`){
        error.classList.add('show');
        weatherBody.classList.remove('show');

        setInterval(function(){
            error.classList.remove('show');
        },2000);
        return;
    }

    weatherBody.classList.add('show');
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Haze':
            weatherImg.src = "./Assets/cloud.png";
            break;
        case 'Clouds':
            weatherImg.src =  "./Assets/cloud.png";
            break;
        case 'Clear':
            weatherImg.src =  "./Assets/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "./Assets/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "./Assets/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "./Assets/snow.png";
            break;
        default:
            weatherImg.src = "./Assets/Map.png";
    }
}

btn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
});