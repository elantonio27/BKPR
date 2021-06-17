///<reference path="../routes/drinklist.js" />
//const { get } = require('../routes');

const sqlite3 = require('sqlite3').verbose();

var uniqid = require('uniqid');




//connecting to Database
const connect = () => {
    this.db = new sqlite3.Database('./db/chinook.db', (err) => {
        if (err) { console.error(err.message); }
        console.log('Connected to the chinook database.');
      
    });
};


//returns the Database
const getDB = () => { return this.db; };



//creates our Table with certain drinks
const initTables = () => {

 


    this.db.serialize(() => {
        this.db.prepare(`CREATE TABLE IF NOT EXISTS bestellung(rid BLOB PRIMARY KEY,bid BLOB,tableno INT,drink TEXT,price REAL,validation TEXT, timestamp DATE DEFAULT (datetime('now','localtime')))`)
            .run().finalize();
    });

    /*
     * 
     * CREATE TABLE whatever(
     ....
     timestamp DATE DEFAULT (datetime('now','localtime')),
     ...
);
     //this works:
    /*
    var bidJSON = getBID();
    var ridJSON = getRID();
    var bid = bidJSON.id;
    var rid = ridJSON.id.replace("-", "");
    
   

    const name = 'Testdrinkdb';
    const preis = 12.90;
    const kpreis = preis.toFixed(2);
    const tableno = 2;
    const validation = "pending";
    preis.toFixed(2);
    console.log("bid");
    console.log(bid);
    console.log("rid");
    console.log(rid);
    */


    // this.db.run("INSERT INTO bestellung(`rid`, `bid`, `tableno` ,`drink`, `price`, `validation`) VALUES(`" + ridJSON.id + "`,`" + bidJSON.id + "`,`" + tableno + "`,`" + name + "`,`" + kpreis + "`,`" + validation + "`)", (err) =>
    /*
    const bestellung = [
        { name: "CubaLibre", preis: 8.20 },
        {name: "AprilShowers", preis: 7.50}
    ]

    var state = "pending";
    var tableno = 0;
    var bid = "w111241212";
    var rid = uniqid();

    bestellung.map(({ name, preis }) =>

        rid = uniqid(),
        console.log(`INSERT INTO bestellung VALUES('${rid}','${bid}',${tableno},'${name}',${preis},'${state}')`)

    );

*/

    
    
};
    
   
        
        
//DB neu
//erstellt die uniqueID und speichert sie in JSON

exports.initTables = initTables;
exports.connect = connect;
exports.getDB = getDB;


    //run('INSERT INTO users(name, age) VALUES("Riko", 29)'
   // var statement = 'INSERT INTO bestellung (`bid`, `drink`, `price`, `validation`) VALUES ("' + bidJSON.id + '", "' + name + '", ' + kpreis + ', "pending")';
    //var statement = "INSERT INTO bestellung(`bid`, `drink`, `price`, `validation`) VALUES(" + bidJSON.id + "," + name + "," + kpreis + ","+ " pending)";
    //this.db.prepare(statement);
    //this.db.prepare('INSERT INTO bestellung (bid, drink, price, validation) VALUES ('`"+apikey+"`',' + name + ',' + kpreis + ', pending');

    //CREATE TABLE IF NOT EXISTS bestellung(bid TEXT, drink TEXT,price REAL,validation TEXT)`).run().finalize();




      // npm run start
    //PRAGMA table_info( bestellung)
    //INSERT INTO bestellung (`bid`, `drink`, `price`, `validation`) VALUES ("c1f9ff70-71e8-11eb-8b1b-77c34b246f91", "Testdrink", 12.90, "pending")
/*
this.db.run('INSERT INTO bestellung (`bid`, `drink`, `price`, `validation`) VALUES ("c1f9ff70-71e8-11eb-8b1b-77c34b246f91", "Testdrink", 12.90, "pending")', (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('Row was added to the table);
})
*/
