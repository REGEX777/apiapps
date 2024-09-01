

Node.js Fun API App
===================

This application is a collection of fun and useful APIs built with Node.js, Express, and EJS. It includes features such as jokes, movie suggestions, weather updates, Pokémon info, and more!

Features
--------

*   Random jokes from the [Official Joke API](https://github.com/15Dkatz/official_joke_api).
*   Weather updates and air quality information using the [OpenWeatherMap API](https://openweathermap.org/api).
*   Random cat facts and images from [CatFact](https://catfact.ninja/) and [TheCatAPI](https://thecatapi.com/).
*   Random dog facts and images using [Dog CEO API](https://dog.ceo/dog-api/) and [Dog Facts API](https://kinduff.github.io/dog-api/).
*   NASA space data including Mars weather, near-Earth objects, and astronomy pictures of the day from [NASA APIs](https://api.nasa.gov/).
*   Pokémon details, evolutions, and type matchups using the [PokéAPI](https://pokeapi.co/).
*   Cryptocurrency prices using the [CoinGecko API](https://www.coingecko.com/en/api).
*   Trivia questions from the [Open Trivia Database](https://opentdb.com/).
*   Latest news articles using the [News API](https://newsapi.org/).
*   NASA's Astronomy Picture of the Day (APOD) using [NASA APIs](https://api.nasa.gov/).

Installation
------------

To get started with the app, clone the repository and install the necessary dependencies:

    git clone https://github.com/yourusername/apiapps.git
    cd apiapps
    npm install

Environment Variables
---------------------

Create a `.env` file in the root of your project and add the following environment variables:

    OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
    NASA_API_KEY=your_nasa_api_key
    BASE_URL=https://api.openweathermap.org/data/2.5
    COINGECKO_API_BASE_URL=https://api.coingecko.com/api/v3
    NEWS_API_KEY=your_news_api_key
Running the Application
-----------------------

Start the server using the following command:

    npm start

The app will run on `http://localhost:3000`. You can access the various API endpoints via your browser:

*   `/` - Home page
*   `/joke` - Random joke
*   `/weather` - Weather update and air quality info (Default city: Delhi)
*   `/cat-facts` - Random cat fact and image
*   `/dog-fact` - Random dog fact and image
*   `/space` - NASA space data
*   `/pokemon` - Random Pokémon info
*   `/crypto` - Top cryptocurrencies
*   `/trivia` - Random trivia questions
*   `/news` - Latest news articles (Default query: technology)
<
