'use strict';
var express = require('express');
var router = express.Router();
//var DB = require('./util/db'); 
var db = require('../util/db');

const { body, validationResult } = require('express-validator');
//for generating the JSON
const parseJson = require('parse-json');

//giving the tables an const number
const anzTische = {anzahl: 10};


/* GET users listing. */
router.get('/', function (req, res) { //gives the client the amount of tables

    res.send(anzTische);

});

router.post('/', function (req, res) { //gives us the tableno
    
    var dbInstance = db.getDB(); //retrieve the database + its tables
    var tableno = req.body.tischnummer;
    var buuid = req.body.buuid.id;
    res.send('Tischnummer gespeichert');
    //neu
    console.log(serveNumber);
    //update table over buuid so we have the right tableno
    dbInstance.run(`UPDATE bestellung SET tableno ='${tableno}' WHERE bid =  '${buuid}'`), (err) => {
        return console.log(err.message);
    }
   


});

module.exports = router; 