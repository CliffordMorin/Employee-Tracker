const mysql = require('mysql');
const inquirer = require('inquirer');
const consTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Imagination123$$',
    database: 'greatBay_DB',
});

  //initial start function to call other function
const start = () => {
    inquirer 
    prompt({
        name: 'firstChoice',
        type: 'list', 
        message: 'Choose one of the options below.',
        choices: [
            "View all Employees?", 
            "View all Roles?",
            "View all Department's", 
            "Update Employee roles",
            "Add Employee?",
            "Add Role?",
            "Add Department?"
        ]
    })

    .then((answer) => {
        switch (answer.firstChoice) {
            case "View all Employees?":
              viewAllEmploy();
            break;

            case "View all Roles?":
              viewRoles();
            break;

            case "View all Department's":
              viewDepart();
            break;

            case "Update Employee roles":
                updateEmployRoles();
            break;

            case "Add Employee?":
                addEmployee();
            break;

            case "Add Role?":
                addRole();
            break;
                
            case "Add Department?":
                addDept();
            break;
        }
    }) 
};

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

const viewAllEmploy = () => {
    connection.query("Select * FROM employee"),
    
};

const viewRoles = () => {
    
};

const viewDepart = () => {
    
};

const updateEmployRoles = () => {

};

const addEmployee = () => {
    
};

const addRole = () => {

};

const addDept = () => {

};