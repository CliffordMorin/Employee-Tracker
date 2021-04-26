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
    database: 'company_db',
});

  //initial start function to call other function
const start = () => {
    inquirer 
    .prompt([{
        name: 'options',
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
    }])

    .then((answer) => {
        switch (answer.options) {
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

//View all employees
const viewAllEmploy = () => {
    connection.query("Select * FROM employee"), (err, res) => {
        if(err) throw err;
        console.log(res);
        console.table(res);
        start();
    }

};

//View all roles
const viewRoles = () => {
    connection.query("Select * FROM role"), (err, res) => {
        if(err) throw err;
        console.table(res);
        console.log(res);
        start();
    }
};

//View all roles
const viewDepart = () => {
    connection.query("Select * FROM department"), (err, res) => {
        if(err) throw err;
        console.table(res);
        console.log(res);
        start();
    }
};

//Select Role Quieries Role Title for Add Employee Prompt
roles = []
const selectRole = () => {
    connection.query("SELECT * FORM role"), (err, res) => {
        if(err) throw err;
        for (let i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }
    }
    return roles;
};

//Select Role Quieries The managers for Add Employee Prompt
manager = []
const selectManager = () => {
    connection.query("SELECT * FORM role"), (err, res) => {
        if(err) throw err;
        for (let i = 0; i < res.length; i++) {
            manager.push(res[i].first_name);
        }
    }
    return manager;
};

const addEmployee = () => {
    inquirer 
    .prompt([
    {
        name: 'firstName',
        type: 'input', 
        message: 'Please enter employees first name.'
    },
    {
        name: 'lastName',
        type: 'input',
        message: 'Please enter employees last name.'
    },
    {
        name: 'role',
        type: 'list',
        message: 'What is the employees role?',
        choices: selectRole() 
    },
    {
        name: 'manager',
        type: 'list',
        message: 'What is the employees managers name?',
        choices: selectManager() 
    }
    ])
    .then((answer) => {
        console.log(answer);
    })
};

// const addRole = () => {

// };

// const addDept = () => {

// };

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});