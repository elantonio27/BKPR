'use strict';
var express = require('express');
var router = express.Router();
var db = require('../util/db');
console.log(db.getDB());
var uniqueid = require('../util/uniqueid');
var dbInstance = db.getDB();
//soll die DB an Java weitergeben
const { body, validationResult } = require('express-validator');
//Informationen in JSON umwandeln
const parseJson = require('parse-json');

//Anzahl der Tische auf konstant setzen


/* GET users listing. */
router.get('/', function (req, res) {
    
    
    db.getDB().all("SELECT * FROM bestellung", function (err, dbBestellung) {
       return res.send(dbBestellung);
    });

});

router.post('/', function (req, res) {

    //hier muss eine Map rein in Form von JSON [rid: "kjlk3jl1j", bid: "alkj2lk3j"]
    var position = req.body;//saving the posted orderlist


    console.log(position.rid + position.bid);

    position.map(({ rid, bid }) => {
        
        dbInstance.run(`DELETE FROM bestellung WHERE '${rid}' = rid AND '${bid}' = bid ')`), (err) => {
            return console.log(err.message);
        }
    });//if errorcode not null -> Datensatz not null
    
    //neu
    console.log(serveNumber);
   return res.send('Datensatz gelöscht');

});

module.exports = router; 