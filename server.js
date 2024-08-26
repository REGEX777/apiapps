require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const NASA_API_KEY = process.env.NASA_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/joke', async (req, res) => {
    try {
        const jokeResponse = await axios.get('https://official-joke-api.appspot.com/random_joke');
        res.render('joke', { joke: jokeResponse.data });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.render('error', { message: 'Failed to fetch jokeee' });
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
        console.error('Error fetching weather data:', error.message);
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

app.get('/dog-fact', async (req, res) => {
    try {
        const [factResponse, imageResponse] = await Promise.all([
            axios.get('https://dog-api.kinduff.com/api/facts'),
            axios.get('https://dog.ceo/api/breeds/image/random')
        ]);

        res.render('dog-fact', {
            fact: factResponse.data.facts[0],
            imageUrl: imageResponse.data.message
        });
    } catch (error) {
        console.error('Error fetching dog fact or image:', error);
        res.render('error', { message: 'Failed to fetch dog fact or image' });
    }
});

app.get('/quote', async (req, res) => {
    try {
        const quoteResponse = await axios.get('https://api.quotable.io/random');
        res.render('quote', { quote: quoteResponse.data });
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.render('error', { message: 'Failed to fetch quote' });
    }
});

app.get('/space', async (req, res) => {
    try {
        const [marsWeather, neos, apod, spaceMissions] = await Promise.all([
            axios.get(`https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`),
            axios.get(`https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=${NASA_API_KEY}`),
            axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`),
            axios.get(`https://launchlibrary.net/1.4/launch/next/10`)
        ]);

        res.render('space', {
            marsWeather: marsWeather.data,
            neos: neos.data.near_earth_objects,
            apod: apod.data,
            spaceMissions: spaceMissions.data.launches
        });
        console.log(apod.data);
        
    } catch (error) {
        console.error('Error fetching space data:', error);
        res.render('error', { message: 'Failed to fetch space data' });
    }
});

app.get('/pokemon', async (req, res) => {
    const pokemon = req.query.name || 'pikachu';
    try {
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        const speciesResponse = await axios.get(pokemonResponse.data.species.url);
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        const type = pokemonResponse.data.types[0].type.name;
        const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);

        res.render('pokemon', {
            name: pokemonResponse.data.name,
            imageUrl: pokemonResponse.data.sprites.front_default,
            abilities: pokemonResponse.data.abilities,
            evolutionChain: evolutionResponse.data.chain,
            typeMatchups: typeResponse.data.damage_relations
        });
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        res.render('error', { message: 'Failed to fetch Pokémon data' });
    }
});

app.get('/crypto', async (req, res) => {
    try {
        const cryptoResponse = await axios.get(`${COINGECKO_API_BASE_URL}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 5,
                page: 1,
                sparkline: false
            }
        });

        res.render('crypto', {
            cryptos: cryptoResponse.data
        });
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.render('error', { message: 'Failed to fetch cryptocurrency data' });
    }
});

app.get('/trivia', async (req, res) => {
    try {
        const triviaResponse = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
        res.render('trivia', {
            questions: triviaResponse.data.results
        });
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        res.render('error', { message: 'Failed to fetch trivia questions' });
    }
});

app.get('/news', async (req, res) => {
    const query = req.query.q || 'technology';
    try {
        const newsResponse = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                apiKey: NEWS_API_KEY
            }
        });

        res.render('news', {
            articles: newsResponse.data.articles,
            query: query
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.render('error', { message: 'Failed to fetch news' });
    }
});

app.get('/nasa-photo', async (req, res) => {
    try {
        const nasaResponse = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: NASA_API_KEY
            }
        });

        res.render('nasa-photo', { photo: nasaResponse.data });
    } catch (error) {
        console.error('Error fetching NASA photo:', error);
        res.render('error', { message: 'Failed to fetch NASA photo' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
