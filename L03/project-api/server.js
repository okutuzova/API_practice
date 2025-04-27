// Importing libraries 

const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


// dichiariamo su che porta risponderà il server web
const port = process.env.PORT || 3000
//creiamo l’istanza del server
const app = express();


// Connessione al database MySql
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kutuzova',
    database: 'db_api_rest'
    });


// Middleware, per ogni richiesta verrà abilitato CORS e verrà parsificato il body JSON
app.use(cors()); // express must use libraries cors and bodyParser
app.use(bodyParser.json());
// Creare un primo endpoint per la risorsa (ad esempio, seleziona tutti gli utenti)
app.get('/api/v1/users', (req, res) => {
    db.query('SELECT * FROM t_utente', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});

// Avviare il server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});