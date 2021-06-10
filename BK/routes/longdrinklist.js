
//alles neu
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
            { name: "Aperol Spritz", preis: "6.80" },
            { name: "B52", preis: "7.80" },
            { name: "Bellini", preis: "7.20" },
            { name: "Black Russian", preis: "6.90" },
            { name: "Gin Fizz", preis: "8.80" },
            { name: "Gimlet", preis: "9.80" },
            { name: "Longdrinktest", preis: "1.00" }

        ]
};



/* GET users listing. */
router.get('/', function (req, res)
{
    res.send(liste) //Sendet die Liste an die Website
});


// POST 
router.post('/', function (req, res) {//erhält die bestellung

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

    //schleife
    //namen abgleichen
    //preis der Namen abgleichen
    //entscheiden ob gut oder schlecht

    //Alle INhalte der Bestellung durchlaufen
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
    //sobald ein boolean Wert aus dem Array false ist, wird eine Fehlermeldung zurückgesendet. 
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



        //wenn 2 Getränke eingefügt werden, dann nimmt er nur eins!
        //Heisst aber, dass er bis hier her kommt!
        //.map wendet auf jedes Objekt die Parameter in den Klammern an


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

