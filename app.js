const app = document.querySelector('.weather-app');
const temp = document.getElementById('temperature');
const conditionOutput = document.getElementById('condition');
const humidityOutput = document.getElementById('humidity');
const windOutput = document.getElementById('wind-speed');
const sunriseOutput = document.getElementById('sunrise');
const sunsetOutput = document.getElementById('sunset');
const nameOutput = document.querySelector('.place');
const timeOutput = document.querySelector('.time');
const dateOutput = document.querySelector('.date');
const form = document.querySelector('form');
const search = document.querySelector('.location');

let city = 'Kolkata'; 
async function fetchWeatherData(city) 
{
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d0f6924e70184a3d843205950242310&q=${city}&days=1&aqi=yes`);
        const data = await response.json();

        if (response.ok) 
        {
            updateWeatherUI(data);
        } 
        else {
            alert('City not found, please try again');
        }
    } 
    catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred. Please try again.');
    }
}


function updateWeatherUI(data) 
{
    const current = data.current;
    const location = data.location;
    nameOutput.innerText = location.name;
    timeOutput.innerText = new Date(location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    dateOutput.innerText = new Date(location.localtime).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    temp.innerText = `Temperature: ${current.temp_c}°C`;
    conditionOutput.innerText = `Condition: ${current.condition.text}`;
    humidityOutput.innerText = `Humidity: ${current.humidity}%`;
    windOutput.innerText = `Wind Speed: ${current.wind_kph} km/h`;
    sunriseOutput.innerText = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
    sunsetOutput.innerText = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
    let timeOfDay = current.is_day ? "day" : "night";
    let backgroundImage;
    const conditionCode = current.condition.code;
    console.log('Condition Code:', conditionCode);
    if (conditionCode === 1000) {
        backgroundImage = 'clear2.jpg'; 
    } else if ([1003, 1006, 1009,1063].includes(conditionCode)) {
        backgroundImage = 'cloudy2.jpg'; 
    } else if ([1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201].includes(conditionCode)) {
        backgroundImage = 'rainy.jpg'; 
    } else if ([1210, 1213, 1216, 1219, 1222, 1225].includes(conditionCode)) {
        backgroundImage = 'snowy.jpg'; 
        backgroundImage = 'default.jpg'; 
    }

    app.style.backgroundImage = `url(${backgroundImage})`;
    app.style.opacity = "1";
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userCity = search.value.trim();

    if (userCity) {
        city = userCity;
        fetchWeatherData(city);
        search.value = '';
    } else {
        alert('Please enter a city name');
    }
});

fetchWeatherData(city);
