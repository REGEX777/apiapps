// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

// Load API keys from environment variables
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/joke', async (req, res) => {
    try {
        const jokeResponse = await axios.get('https://official-joke-api.appspot.com/random_joke');
        res.render('joke', { joke: jokeResponse.data });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.render('error', { message: 'Failed to fetch joke' });
    }
});

app.get('/weather', async (req, res) => {
    const city = req.query.city || 'New York';
    try {
        const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: OPENWEATHERMAP_API_KEY,
                units: 'metric'
            }
        });

        const forecastResponse = await axios.get(`${BASE_URL}/forecast/daily`, {
            params: {
                q: city,
                appid: OPENWEATHERMAP_API_KEY,
                units: 'metric',
                cnt: 7
            }
        });

        const airQualityResponse = await axios.get(`${BASE_URL}/air_pollution`, {
            params: {
                lat: weatherResponse.data.coord.lat,
                lon: weatherResponse.data.coord.lon,
                appid: OPENWEATHERMAP_API_KEY
            }
        });

        res.render('weather', {
            currentWeather: weatherResponse.data,
            forecast: forecastResponse.data,
            airQuality: airQualityResponse.data
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.render('error', { message: 'Failed to fetch weather data' });
    }
});


app.get('/cat-facts', async (req, res) => {
    try {
        const catFactsResponse = await axios.get('https://catfact.ninja/fact');
        res.render('cat-facts', { catFact: catFactsResponse.data.fact });
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        res.render('error', { message: 'Failed to fetch cat fact' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
