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
const mainMenu = () => {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'Select Option',
      choices: ['Show All Employees', 'Add New Employee', 'Close Program']
    }
  ])
  .then(choice => {
      
      switch(choice.mainMenu) {
        case 'Show All Employees':
          selectAll();
          break;
        case 'Add New Employee':
          getNewEmpInfo()
          break;
        case 'Close Program':
          exitMusic();
        default:
          console.log('There has been an issue. Please call technical support.');
          exitMusic();
      }
  });
}

const getNewEmpInfo = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Employee First Name"
      },
      {
        type: "input",
        name: "lastName",
        message: "Employee Last Name"
      },
      {
        type: "input",
        name: "roleID",
        message: "Employee Role ID"
      },
      {
        type: "input",
        name: "managerID",
        message: "Employee Manager's ID"
      },
    ])
    .then(responses => {
      addEmployee(responses.firstName, responses.lastName, responses.roleID, responses.managerID);
    })
}

  // ================================== Query Logic ======================================//
  const selectAll = () => {
    let sqlQuery = 'SELECT employee.id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary" FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY employee.id ASC;'

    connection.query(sqlQuery, (err, res) => {
      if (err) throw err;

      console.table(res)

      returnToMain();

    });
  }

  const addEmployee = (firstName, lastName, roleID, managerID=2) => {
    let sqlQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleID}', '${managerID}');`

    connection.query(sqlQuery, (err, res) => {
      if (err) throw err;

      console.log('Employee Successfully Added!!');

      mainMenu();

    });
  }

  // ================================== Misc. Function ===================================//
const exitMusic = () => {
  console.log('Saving Database Changes...');
  console.log('Tucking the Database in.. wishing it sweet dreams...');
  console.log('Closing Application...');
  process.exit();
}

const returnToMain = () => {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'return',
        message: 'Would you like to return to the main menu?'
      }
    ])
    .then(choice => {
      if (choice.return) {
        mainMenu();
      } else {
        exitMusic();
      }
    })
}

//=======================================================================================//

//================ APP START ==================//
mainMenu(); //=================================//
//=============================================//

