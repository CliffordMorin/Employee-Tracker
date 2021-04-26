const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "Imagination123$$",
  database: "company_db",
});

//initial start function to call other function
const start = () => {
  inquirer
    .prompt([
      {
        name: "options",
        type: "list",
        message: "Choose one of the options below.",
        choices: [
          "View all Employees?",
          "View all Roles?",
          "View all Department's",
          "Update Employee roles",
          "Add Employee?",
          "Add Role?",
          "Add Department?",
          "Remove an Employee",
          "Remove a Role",
          "Remove a Department"
        ],
      },
    ])

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

        case "Remove an Employee":
            removeEmployee();
        break;

        case "Remove a Role":
            removeRole();
        break;

        case "Remove a Department":
            removeDept();
        break;
      }
    });
};

//=========View all employees==========//
const viewAllEmploy = () => {
  connection.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//=============View all roles===========//
const viewRoles = () => {
  connection.query("Select * FROM roles", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//==============View all Department's=============//
const viewDepart = () => {
  connection.query("Select * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

//========Add Employee=========//
const addEmployee = () => {
  connection.query("SELECT * FROM roles", (err, roles) => {
    if (err) throw err;
    let newRoles = roles.map((role) => ({ name: role.title, value: role.id }));

    connection.query("SELECT * FROM employee", (err, managers) => {
      if (err) throw err;
      let newManager = managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id,
      }));
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "Please enter employees first name.",
          },
          {
            name: "lastName",
            type: "input",
            message: "Please enter employees last name.",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the employees role?",
            choices: newRoles,
          },
          {
            name: "manager",
            type: "rawlist",
            message: "What is the employees managers name?",
            choices: newManager,
          },
        ])
        .then((answer) => {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              manager_id: answer.manager,
              role_id: answer.role,
            },

            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} employee inserted!\n`);
              // Call start AFTER the INSERT completes
              start();
            }
          );
        });
    });
  });
};

//========Add Role=========//
const addRole = () => {
    connection.query("SELECT * FROM department", (err, departments) => {
        if (err) throw err;
        let newDepartment = departments.map((department) => ({
          name: `${department.name}`,
          value: department.id,
        }));
        inquirer
        .prompt([
          {
            name: "roleName",
            type: "input",
            message: "Please enter your Role name.",
          },
          {
            name: "salary",
            type: "input",
            message: "Please enter salary.",
          },
          {
            name: "department",
            type: "rawlist",
            message: "What department is your role in?",
            choices: newDepartment,
          },
        ])
        .then((answer) => {
          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: answer.roleName,
              salary: answer.salary,
              department_id: answer.department
            },

            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} role inserted!\n`);
              // Call start AFTER the INSERT completes
              start();
            }
          );
        });
        
    });
};

//========Add Department=========//
const addDept = () => {
    inquirer
        .prompt([
          {
            name: "newDept",
            type: "input",
            message: "Please enter your New Department name.",
          },
        ])
        .then((answer) => {
          connection.query(
            "INSERT INTO department SET ?",
            {
              name: answer.newDept,
            },

            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} department inserted!\n`);
              // Call start AFTER the INSERT completes
              start();
            }
          );
        });
};

//========Update Employee Role=========//
const updateEmployRoles = () => {
    connection.query("SELECT * FROM roles", (err, roles) => {
        if (err) throw err;
        let newRoles = roles.map((role) => ({ name: role.title, value: role.id }));
    
        connection.query("SELECT * FROM employee", (err, employees) => {
          if (err) throw err;
          let newEmployee = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          }));
          inquirer
            .prompt([
              {
                name: "employee",
                type: "rawlist",
                message: "Which employee do you want to update?",
                choices: newEmployee,
              },
              {
                name: "role",
                type: "rawlist",
                message: "What is the employees new role?",
                choices: newRoles,
              },
            ])
            .then((answer) => {
              connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                {
                  role_id: answer.role,
                },
                {
                  id: answer.employee,  
                }
                ],
                (err, res) => {
                  if (err) throw err;
                  console.log(`${res.affectedRows} new role's inserted!\n`);
                  // Call start AFTER the INSERT completes
                  start();
                }
              );
            });
        });
      });
}

//========Remove Employee=========//

const removeEmployee = () => {

}

//========Remove Role=========//

const removeRole = () => {

}

//========Remove Department=========//

const removeDept = () => {
    connection.query("SELECT * FROM department", (err, departments) => {
        if (err) throw err;
        let deleteDepartment = departments.map((department) => ({
          name: `${department.name}`,
          value: department.id,
        }));
        inquirer
        .prompt([
          {
            name: "department",
            type: "rawlist",
            message: "What department would you like to remove?",
            choices: deleteDepartment,
          },
        ])
        .then((answer) => {
          connection.query(
            "DELETE FROM department WHERE ?",
            {
              id: answer.department
            },

            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} department deleted!\n`);
              // Call start AFTER the INSERT completes
              start();
            }
          );
        });
        
    });
}

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
