const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./config');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

const getBooks = (request, response) => {
    pool.query('SELECT * FROM books', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addBook = (request, response) => {
    const { author, title } = request.body

    pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
        if (error) {
            throw error
        }
        response.status(201).json({ status: 'success', message: 'Book added.' })
    })
}

app
    .route('/books')
    // GET endpoint
    .get(getBooks)
    // POST endpoint
    .post(addBook)

app
    .route('/api')
    // GET endpoint
    .get(getBooks)
    // POST endpoint
    .post(addBook)

/*app.use((req, res) => {
    res.json({ message: 'Your request was successful!' });
});*/

/*app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Thing created successfully!'
    });
});


app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'My first thing',
            description: 'All of the info about my first thing',
            imageUrl: '',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'My second thing',
            description: 'All of the info about my second thing',
            imageUrl: '',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
});*/



module.exports = app;