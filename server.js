// =================================== Imports and Require Statements ====================//
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");
const keys = require("./config/keys/keys");

// =================================== Setting Up mySQL Connection =======================//
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: keys.mysqlpass,
  database: "meuixCMS_DB"
});

connection.connect(function(err) {
  if (err) {
    console.error("CONNECTION FAILURE : " + err.stack);
    return;
  }
  console.log("CONNECTION SUCCESS.. Thread ID : " + connection.threadId);
});
// =======================================================================================//