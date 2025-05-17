// Importing libraries 

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
// const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


// dichiariamo su che porta risponderà il server web
const port = process.env.PORT || 3001
//creiamo l’istanza del server
const app = express();


// Connessione al database Sqlite
const db = new sqlite3.Database('./database/Chinook.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Errore nella connessione del DB SQLite', err.message);
    }
    console.log('Connessione al database SQLite stabilita');
});


// Middleware, per ogni richiesta verrà abilitato CORS e verrà parsificato il body JSON
app.use(cors()); // express must use libraries cors and bodyParser
app.use(bodyParser.json());

// Creare un primo endpoint per la risorsa (ad esempio, seleziona tutti gli utenti)
app.get('/api/v1/artists', (req, res) => {
    // db.query('SELECT * FROM artist', (err, results) => {
    db.all('SELECT * FROM artist', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.json(results);
        }
    });
});


// Creare un endpoint per la risorsa con id (per esempio selezione utente con id 1)
app.get('/api/v1/artists/:ArtistId', (req, res) => {
    // per leggere il parametri
    const ArtistId = req.params.ArtistId;
    db.get('SELECT * FROM artist WHERE ArtistId = ?', [ArtistId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else if (!results) {
            res.status(404).json('Artista non trovato'); 
        }
        
        else {
            res.json(results);
        }
    });
});


/*
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
*/



// Creare un endpoint per aggiungere la risorsa con id
// Important note: apart from URI, the object json must be passed in the body of the request 
app.post('/api/v1/artists/', (req, res) => {
    // what we receive from body is transformed into a json
    //if the data does not correspond, the values will be null
    const {ArtistId, Name} = req.body; // {id: 1, nome: 'Mario', cognome: 'Rossi', data_di_nascita: '1990-01-01'}}
    const newArtist = {ArtistId, Name};
  
    db.run('INSERT INTO artist (ArtistId, Name) VALUES (?, ?)', [ArtistId, Name], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore nel database');
        } else {
            res.status(201).json({ArtistId: ArtistId, Name: Name});
        }
    });
});



// Creare un endpoint per aggiungere la modifica alla risorsa user
// devo passare un ogetto JSON che sara quello modificato sul database

app.put('/api/v1/artists/:ArtistId', (req, res) => {
    const ArtistId = req.params.ArtistId;
    const {Name} = req.body;
    
    db.run('UPDATE artist SET Name = ? WHERE ArtistId = ?', 
        [Name, ArtistId], 
        function(err) {  // Using regular function to access 'this'
            if (err) {
                console.error(err);
                res.status(500).send('Errore nel database');
                return;
            }
            if (this.changes === 0) {  // Using this.changes instead of results.affectedRows
                return res.status(404).json({message: 'Artist not found'});
            }
            res.json({ArtistId, Name});
        }
    );
});



// Avviare il server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});