const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

app.use(morgan('common'));
app.use(cors());

const playstore = require('./playstore-data.js');

app.get('/apps', (req, res) => {
    const { genre = " ", sort } = req.query;

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        }
    }

    let results = playstore
        .filter(item =>
            item
                .Genres
                .toLowerCase()
                .includes(genre.toLowerCase()));

    if (sort) {
        results
        .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    res.json(results);
})

app.listen(8000, () => {
    console.log('Listenin on PORT 8000');
})