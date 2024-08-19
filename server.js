const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_URL = 'https://api.nasa.gov/planetary';

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/joke', async (req, res) => {
    try {
        const jokeResponse = await axios.get('https://official-joke-api.appspot.com/random_joke');
        res.render('joke', { joke: jokeResponse.data });
    } catch (error) {
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
        res.render('error', { message: 'Failed to fetch weather data' });
    }
});

app.get('/cat-facts', async (req, res) => {
    try {
        const catFactsResponse = await axios.get('https://catfact.ninja/fact');
        res.render('cat-facts', { catFact: catFactsResponse.data.fact });
    } catch (error) {
        res.render('error', { message: 'Failed to fetch cat fact' });
    }
});

app.get('/dog-fact', async (req, res) => {
    try {
        const factResponse = await axios.get('https://dog-api.kinduff.com/api/facts');
        const imageResponse = await axios.get('https://dog.ceo/api/breeds/image/random');

        res.render('dog-fact', {
            fact: factResponse.data.facts[0],
            imageUrl: imageResponse.data.message
        });
    } catch (error) {
        res.render('error', { message: 'Failed to fetch dog fact or image' });
    }
});

app.get('/nasa', async (req, res) => {
    try {
        const apodResponse = await axios.get(`${NASA_URL}/apod`, {
            params: {
                api_key: NASA_API_KEY
            }
        });

        res.render('nasa', { apod: apodResponse.data });
    } catch (error) {
        res.render('error', { message: 'Failed to fetch NASA data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
