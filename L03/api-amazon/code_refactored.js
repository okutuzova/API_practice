// Importing libraries 

const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


// dichiariamo su che porta risponderà il server web
const port = process.env.PORT || 4000
//creiamo l’istanza del server
const app = express();


// Connessione al database MySql
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kutuzova',
    database: 'db_my_amazon'
    });


// Middleware, per ogni richiesta verrà abilitato CORS e verrà parsificato il body JSON
app.use(cors()); // express must use libraries cors and bodyParser
app.use(bodyParser.json());


// Created a separate funmction to avoid repeating of the code
const runQuery = (res, sql, params = []) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
};


// Tutti gli utenti (con password)
app.get('/myamazon/api/v1/utenti', (req, res) => {
    runQuery(res, 'SELECT * FROM t_utenti');
});

// Tutti gli utenti (senza password)
app.get('/myamazon/api/v1/utenti_no_pass', (req, res) => {
    runQuery(res, 'SELECT id_utente, nome, cognome, username FROM t_utenti');
});

// Tutti i prodotti
app.get('/myamazon/api/v1/prodotti', (req, res) => {
    runQuery(res, 'SELECT * FROM t_prodotti');
});



// Avviare il server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});