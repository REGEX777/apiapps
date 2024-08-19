const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/joke', async (req, res) => {
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
        const joke = response.data.joke;
        res.json({ joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ message: 'Failed to fetch joke' });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
