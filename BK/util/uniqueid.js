//new uuid
const uuid = require('uuid');

const getBID = () => {


    var bID = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' Time Based

    const bidJSON = { name: "bid", id: bID };
                
        
    //must be also sent to our USER so he knows his unique id
    //in case of order-withdrawment or insufficient funds
    //thats the number that reidentifies the order

    return bidJSON;


};

const getRID = () => {

    var rID = uuid.v4(); //4th version of uuid 
    const ridJSON = { name: "rid", id : rID };
    return ridJSON;
    //thats the number that identifies the user/client.
}


exports.getBID = getBID;
exports.getRID = getRID;