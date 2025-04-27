// Importing libraries 

const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT||4000

const app = express();

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'ITS_2025',
    password: 'ITS_2025',
    database: 'amazon_test'
    });




// Middleware, per ogni richiesta verrà abilitato CORS e verrà parsificato il body JSON
app.use(cors()); // express must use libraries cors and bodyParser
app.use(bodyParser.json());

// res object response if express
//sql - query itself
// params - request params like where id = ?
const runQuery = (res, sql, params = []) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');


        } else {
            res.json(results);
        }
    });
};

app.get('/api/v1/users', (req, res) => {
    runQuery(res, 'SELECT * FROM users');
});

app.get('/api/v1/users_no_pass', (req, res) => {
    runQuery(res, 'SELECT id, name, email FROM users');
});

app.get('/api/v1/products', (req, res) => {
    runQuery(res, 'SELECT * FROM products');
});


// Creare un primo endpoint per la risorsa (ad esempio, seleziona tutti gli utenti)
// app.get('/api/v1/users', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Errore nel database');
//         } else {
//             res.json(results);
//         }
//     });
// });


// Creare un primo endpoint per la risorsa (ad esempio, seleziona tutti gli utenti)
// app.get('/api/v1/products', (req, res) => {
//     db.query('SELECT * FROM products', (err, results) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Errore nel database');
//         } else {
//             res.json(results);
//         }
//     });
// });

// Avviare il server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});