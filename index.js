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
    let sqlQuery = 'SELECT employee.id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary" FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employee.id ASC;'

    connection.query(sqlQuery, (err, res) => {
      if (err) throw err;

      console.table(res)

    });
  }




