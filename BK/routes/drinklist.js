'use strict';
var express = require('express');
var router = express.Router();
var db = require('../util/db');
//const { getBID } = require('./uniqueid');
//const { getRID } = require('./uniqueid');
var uniqueid = require('../util/uniqueid');
//const { body, validationResult } = require('express-validator');
//const parseJson = require('parse-json');
var uniqid = require('uniqid');

const liste = {
    buuid: uniqueid.getBID(),
    results:
        [
            { name: "CubaLibre", preis: "6.80" },
            { name: "AprilShower", preis: "7.80" },
            { name: "BermudaRose", preis: "7.20" },
            { name: "Caipirinha", preis: "6.90" },
            { name: "Cosmopolitan", preis: "8.80" },
            { name: "Daiquiri", preis: "9.80" },
            { name: "Test", preis: "1.00" }


        ]
};



/* GET users listing. */
router.get('/', function (req, res)//reaction on get-Method
{

    res.send(liste) //sending a map of drinks
    
});
// POST 
router.post('/', function (req, res) {//react on postment

    //var bestellung = JSON.parse(req.body.testkey);
    var bestellung = req.body;//saving the posted orderlist
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
    //checking on our values is possiple by execution of these lines:
    // console.log("map:");
    //console.log(listenMap);

    //looping through our order
    for (let i = 0; i < bestellung.length; i++)
    {

        for (let j = 0; j < listenMap.length; j++)
        {
            if (bestellung[i].name == listenMap[j].name)//we compare the price of each item with the original price 
            {
                if (bestellung[i].preis == listenMap[j].preis)
                {

                    validation = true;//by creating an array we can determinate the exact position
                    validations.push(validation);//an array of validations 
                }
                else
                {
                    validation = false;
                    validations.push(validation);
                }
            }
        }
    }
    //gives us the error for wrong numbers in the order 
    //if one entry in our validation array is wrong we define the legit boolean false which restricts the order
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
            //BIDS and RIDS are similar, needs to be differentiated
            //RID variies which is good since this is our Primary Key
            rid = uniqid(),
            dbInstance.run(`INSERT INTO bestellung VALUES('${rid}','${bid}',${tableno},'${name}',${preis},'${state}')`)

        );
        
        */
  
        
     }
    
    res.send(legit);
    


});


module.exports = router;

/*
       dbInstance.getDB.run('INSERT INTO bestellung (`bid`,`tabelno`,`drink`, `price`, `validation`) VALUES ("c1f9ff70-71e8-11eb-8b1b-77c34b246f91", 1, "Testdrinkweb", 12.90, "pending")', (err) =>
       {
           if (err)
           {
                 return console.log(err.message);
           }
            console.log('Row was added to the table'); //keine Ausgabe
       });

 bestellung.map(({ name, preis }) =>
            //beide BIDS sind gleich. Nur die RID ist verschieden.
            //RID ist aber der PK also sollten gleiche BIDs egal sein-> sind zur Bestellungsidentifikation
            rid = uniqid(),
            dbInstance.run(`INSERT INTO bestellung VALUES('${rid}','${bid}',${tableno},'${name}',${preis},'${state}')`)

        );

  bestellung.map(({ name, preis }) => {

            rid = uniqid(),
            console.log(`INSERT INTO bestellung VALUES('${rid}','${bid}',${tableno},'${name}',${preis},'${state}')`)


        });
*/