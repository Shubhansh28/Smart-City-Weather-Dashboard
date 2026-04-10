const apiKey = "0f19f4e2c17f45378a58baa024fb3369"
let btn = document.getElementById('btn')
let place = document.getElementById('input_place')
let dataDisplay = document.getElementById('root')

function showLoading() {
    dataDisplay.innerHTML = `
        <div class="loading-wrapper">
            <div class="spinner"></div>
            <div class="message">Fetching weather details...</div>
        </div>
    `;
}

function showError(msg) {
    dataDisplay.innerHTML = `<div class="message">${msg}</div>`;
}

function updateWeatherUI(res) {
    let temp = res.main.temp;
    let weatherCondition = res.weather[0].main.toLowerCase();
    let desc = res.weather[0].description;
    let icon = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    let cityName = res.name;
    let country = res.sys.country;
    let humidity = res.main.humidity;
    let windSpeed = res.wind.speed;

    document.body.className = '';
    if (temp < 15) {
        document.body.classList.add('cold-bg');
    } else if (temp >= 15 && temp < 30) {
        document.body.classList.add('warm-bg');
    } else {
        document.body.classList.add('hot-bg');
    }

    let advice = "";
    if (temp < 15) {
        advice = "Wear a warm jacket, it's cold!";
    } else if (temp >= 15 && temp < 25) {
        advice = "A t-shirt or light jacket is fine.";
    } else {
        advice = "Wear light clothes, it's hot!";
    }

    if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
        advice += " Bring an umbrella!";
    } else if (weatherCondition.includes('snow')) {
        advice += " Wear snow boots and gloves!";
    }

    dataDisplay.innerHTML = `
        <div class="weather-header">
            <h2>${cityName}, ${country}</h2>
            <img src="${icon}" alt="Weather Icon">
        </div>
        <div class="temp-large">${Math.round(temp)}°C</div>
        <div class="weather-desc">${desc}</div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <span>Humidity</span>
                <strong>${humidity}%</strong>
            </div>
            <div class="metric-card">
                <span>Wind</span>
                <strong>${windSpeed} m/s</strong>
            </div>
        </div>

        <div class="advice-card">
            <strong>Recommended Gear</strong>
            ${advice}
        </div>
    `;
}

function fetchWeather(area) {
    showLoading();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${apiKey}&units=metric`)
        .then((res)=>{
            if (!res.ok){
                throw new Error("City not found");
            }
            return res.json()
        })
        .then(updateWeatherUI)
        .catch(err => {
            showError("Oops! City not found. Please try again.");
            console.error(err);
        });
}

function fetchWeatherByCoords(lat, lon) {
    showLoading();
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then((res)=>{
            if (!res.ok){
                throw new Error("Unable to fetch data for current location.");
            }
            return res.json()
        })
        .then(updateWeatherUI)
        .catch(err => {
            showError("Couldn't retrieve local weather.");
            console.error(err);
        });
}

btn.addEventListener('click',()=>{
    let area = place.value.trim();
    if(area) {
        place.value = "";
        fetchWeather(area);
    }
});

place.addEventListener("keydown",(event)=>{
    if (event.key == "Enter") {
        btn.click();
    }
});

window.addEventListener('load', () => {
    // Show loading immediately so the user knows we're working
    showLoading();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                fetchWeatherByCoords(lat, lon);
            },
            error => {
                console.warn("Geolocation denied or failed. Loading fallback city.");
                // Fallback to a default city if geolocation fails
                fetchWeather("London");
            },
            { timeout: 5000 } // Give it 5 seconds before failing
        );
    } else {
        console.warn("Geolocation not supported. Loading fallback city.");
        fetchWeather("London");
    }
});
