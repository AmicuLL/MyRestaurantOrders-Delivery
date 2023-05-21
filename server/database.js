const { JsonDB } = require( 'node-json-db' );
const { Config } = require( 'node-json-db/dist/lib/JsonDBConfig' );

var DBCreation = require('./DBCreation.js');
DBCreation("./Database/database.json"); //to autopopulate database
var db = new JsonDB(new Config("./Database/database.json", true, true, '/')); //db database object

module.exports = db;