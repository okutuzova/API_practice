// Importing libraries 

const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kutuzova',
    database: 'books'
    });

app.use(cors());
app.use(bodyParser.json());

// Endpoint to retrieve all books from DB
app.get('/api/v1/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database Error'); 
        } else {
            res.json(results);
        }
    });
});

// Endpoint to retrieve a book by ID from DB
app.get('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id;
    db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database Error'); 
        }  else {
            res.json(results);
        }
    });    
})


// Endpoint to add a book to DB
app.post('/api/v1/books/', (req, res) => {
    const {id, title, author, genre, image} = req.body;
    const newBook = {id, title, author, genre, image};

    db.query('INSERT INTO books SET?', newBook, (err,results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database Error');
        } else {
            res.status(201).json({id:results.insertId, ...newBook});
        }
    });
});

// Endpoint to update a book in DB
app.put('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id; 
    const {title, author, genre, image} = req.body;
    const updatedBook = {title, author, genre, image};

    db.query('UPDATE books SET ? WHERE id=?', [updatedBook, bookId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database Error');
        } 
        if (results.affectedRows === 0) {
            return res.status(404).json({message:'Book not found'});
        }
        res.json({id:bookId,...updatedBook});
    });
});

// Endpoint to delete a book from DB
app.delete('/api/v1/books/:id', (req, res) => {
    const bookId = req.params.id;
    db.query('DELETE FROM books WHERE id = ?', [bookId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database Error'); 
        } else {
            res.json(results);
        }
    }); 
});


// Start server
app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
});