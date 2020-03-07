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

// =================================== Inquirer Logic ====================================//
inquirer
  .prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'Select Option',
      choices: ['Show All Employees', 'Do Nothing']
    }
  ])
  .then(choice => {
      console.log("Choice " + choice.mainMenu);
      selectAll();
  });

  // ================================== Query Logic ======================================//
  const selectAll = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;

      console.table(res)
    });
  }




