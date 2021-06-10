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

    db.getDB().each("SELECT * FROM bestellung", function (err, dbBestellung) {
        res.send(dbBestellung);
    });
});

router.post('/', function (req, res) {

    var bearbeitet = req.body.tischnummer;
    console.log(serveNumber);
    res.send('Tischnummer gespeichert');
    //neu
    console.log(serveNumber);

});

module.exports = router; 