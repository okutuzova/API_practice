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

// Creare un endpoint per la risorsa con id (per esempio selezione utente con id 1)
app.get('/api/v1/users/:id', (req, res) => {
    // per leggere il parametri
    const id = req.params.id;
    db.query('SELECT * FROM t_utente WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});



// Creare un endpoint per cancellare la risorsa con id 
app.delete('/api/v1/users/:id', (req, res) => {
    // per leggere i parametri
    const id = req.params.id;
    db.query('DELETE FROM t_utente WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});


// Creare un endpoint per aggiungere la risorsa con id
// Important note: apart from URI, the object json must be passed in the body of the request 
app.post('/api/v1/users/', (req, res) => {
    // what we receive from body is transformed into a json
    //if the data does not correspond, the values will be null
    const {id, nome, cognome, data_di_nascita} = req.body; // {id: 1, nome: 'Mario', cognome: 'Rossi', data_di_nascita: '1990-01-01'}}
    const newUser = {id, nome, cognome, data_di_nascita};
  
    db.query('INSERT INTO t_utente SET ?', newUser, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.status(201).json({id:results.insertId, ...newUser});
        }
    });
});

// Creare un endpoint per aggiungere la modifica alla risorsa user
// devo passare un ogetto JSON che sara quello modificato sul database

app.put('/api/v1/users/:id', (req, res) => {
    
    //leggo il parametro
    const id = req.params.id;
    // leggo il dato inviato sul body
    const {nome, cognome, data_di_nascita} = req.body; // {id: 1, nome: 'Mario', cognome: 'Rossi', data_di_nascita: '1990-01-01'}}
    const updatedUser = {id, nome, cognome, data_di_nascita};
  
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