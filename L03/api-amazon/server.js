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
// Creare un primo endpoint per la risorsa -  tutti gli utenti
app.get('/myamazon/api/v1/utenti', (req, res) => {
    db.query('SELECT * FROM t_utenti', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});

// Creare un primo endpoint per la risorsa -  tutti i prodotti
app.get('/myamazon/api/v1/prodotti', (req, res) => {
    db.query('SELECT * FROM t_prodotti', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});

// Endpoint that returns all user data without password
app.get('/myamazon/api/v1/utenti_no_pass', (req, res) => {
    db.query('SELECT id_utente, nome, cognome, username FROM t_utenti', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});



// Creare un endpoint per la risorsa con id (per esempio selezione utente con id 1)
app.get('/myamazon/api/v1/utenti/:id', (req, res) => {
    // per leggere il parametri
    const id = req.params.id;
    db.query('SELECT * FROM t_utenti WHERE id_utente = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});


// Creare un endpoint per cancellare la risorsa con id 
app.delete('/myamazon/api/v1/utenti/:id', (req, res) => {
    // per leggere il parametri
    const id = req.params.id;
    db.query('DELETE FROM t_utenti WHERE id_utente = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});


// Creare un endpoint per creare la risorsa 
app.post('/myamazon/api/v1/utenti/', (req, res) => {
    const {id_utente, nome, cognome, username, password} = req.body;
    const newUser = {id_utente, nome, cognome, username, password};
    db.query('INSERT INTO t_utenti SET ?', newUser, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.status(201).json({id_utente: results.insertId, ...newUser});
        }
    });
});

// Creare un endpoint per aggiungere la modifica alla risorsa user
// devo passare un ogetto JSON che sara quello modificato sul database

app.put('/myamazon/api/v1/utenti/:id', (req, res) => {
    
    //leggo il parametro
    const id = req.params.id;
    // leggo il dato inviato sul body
    const {nome, cognome, username, password} = req.body; // {id: 1, nome: 'Mario', cognome: 'Rossi', data_di_nascita: '1990-01-01'}}
    const updatedUser = {nome, cognome, username, password};
  
    db.query('UPDATE t_utente SET ? WHERE id=?', [updatedUser, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } 
        if (results.affectedRows === 0) {
            return res.status(404).json({message:'Utente non trovato'}); // 404 Not Found error
        } 
        res.json({id, ...updatedUser});
        
         
    });
});



// Avviare il server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});