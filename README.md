Smart City Weather
A clean, responsive weather web app that shows real-time weather data for any city in the world. Built using plain HTML, CSS, and JavaScript with the OpenWeatherMap API.

Features
• Search weather by city name
• Auto-detects your current location on page load using the browser's Geolocation API
• Displays temperature, humidity, wind speed, and weather condition
• Dynamic background that changes based on temperature (cold, warm, hot)
• Clothing advice based on current weather conditions
• Glassmorphism UI with smooth transitions

Tech Stack
• HTML5
• CSS3 (with glassmorphism and responsive design)
• Vanilla JavaScript (ES6+)
• OpenWeatherMap API

Project Structure
• index.html — Main HTML file with the app layout
• style.css — All styling including glass effect, backgrounds, and layout
• script.js — JavaScript logic for fetching weather data and updating the UI

Getting Started
• Clone or download the project files to your local machine
• Open index.html directly in your browser, no build tools or server needed
• Allow location access when prompted to auto-load your local weather
• Or just type a city name in the search box and hit Search or press Enter

API Setup
• This project uses the OpenWeatherMap API
• The API key is already included in script.js for demo purposes
• To use your own key, sign up at https://openweathermap.org and replace the value of the apiKey variable in script.js

How It Works
• On load, the app requests your browser location and fetches weather for your coordinates
• If location is denied or unavailable, the search box is shown for manual input
• Weather data is fetched from the OpenWeatherMap current weather endpoint
• The background gradient updates based on the temperature range
• A short advice message tells you what to wear based on temperature and conditions

Weather Background Themes
• Cold (below 15°C) — Deep blue gradient
• Warm (15°C to 29°C) — Green gradient
• Hot (30°C and above) — Red-orange gradient

Clothing Advice Logic
• Below 15°C — Recommends a warm jacket
• 15°C to 24°C — Suggests a t-shirt or light jacket
• 25°C and above — Recommends light clothes
• Rain or drizzle detected — Adds a reminder to carry an umbrella
• Snow detected — Suggests snow boots and gloves