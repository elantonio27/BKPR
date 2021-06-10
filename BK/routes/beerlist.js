'use strict';
var express = require('express');
var router = express.Router();
var db = require('../util/db');
var uniqueid = require('../util/uniqueid');
var dbInstance = db.getDB();
const { body, validationResult } = require('express-validator');
const parseJson = require('parse-json');
var uniqid = require('uniqid');

const liste = {
    buuid: uniqueid.getBID(),
    results:
        [
            { name: "Distelhaeuser", preis: "3.80" },
            { name: "Sternla", preis: "2.80" },
            { name: "Spalter", preis: "2.20" },
            { name: "Schoefferhofer", preis: "1.90" },
            { name: "Heinekken", preis: "4.80" },
            { name: "Kaeuzle", preis: "3.90" },
            { name: "Test", preis: "1.00" }

        ]
};

//for detailled inline comments see drinklist.js



/* GET users listing. */
router.get('/', function (req, res)
{
    res.send(liste) 
});


// POST 
router.post('/', function (req, res) {

    //var bestellung = JSON.parse(req.body.testkey);
    var bestellung = req.body;
    var validations = [];
    var validation = false;
    var legit = false;
    console.log(bestellung);
    //neu
    var listenMap = liste.results.map(function (listenelement) {
        if (listenelement.preis > 0) {
            var info = {
                "name": listenelement.name,
                "preis": listenelement.preis
            }
            return info;
        }
    });
    // console.log("map:");
    //console.log(listenMap);

    

    for (let i = 0; i < bestellung.length; i++) {

        for (let j = 0; j < listenMap.length; j++) {
            if (bestellung[i].name == listenMap[j].name) {
                if (bestellung[i].preis == listenMap[j].preis) {

                    validation = true;
                    validations.push(validation);
                }
                else {
                    validation = false;
                    validations.push(validation);
                }
            }
        }
    }
    for (let k = 0; k < validations.length; k++) {
        if (validations[k] == false) {
            legit = false;
        }
        else {
            legit = true;
        }
    }//DB NEU
    console.log(legit);
    if (legit == true) {
        var bid = liste.buuid.id;
        var rid = uniqid();
        var state = "pending";
        var tableno = 0;
        var dbInstance = db.getDB();



        

        bestellung.map(({ name, preis }) => {
            rid = uniqid();
            console.log(`INSERT INTO bestellung VALUES('${rid}','${bid}',${tableno},'${name}',${preis},'${state}')`)
            dbInstance.run(`INSERT INTO bestellung VALUES('${rid}','${bid}',${tableno},'${name}',${preis},'${state}')`), (err) => {
                return console.log(err.message);
            }
        });


        /*
         bestellung.map(({ name, preis }) =>
             //beide BIDS sind gleich. Nur die RID ist verschieden.
             //RID ist aber der PK also sollten gleiche BIDs egal sein-> sind zur Bestellungsidentifikation
             rid = uniqid(),
             dbInstance.run(`INSERT INTO bestellung VALUES('${rid}','${bid}',${tableno},'${name}',${preis},'${state}')`)
 
         );
         
         */


    }

    res.send(legit);



});


module.exports = router;

