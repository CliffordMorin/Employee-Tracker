-- DEPARTMENT SEEDS---
INSERT INTO department(name)
VALUES("Legal"), ("Human Resources"), ("Engineering"), ("Sales");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO roles (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO roles (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO roles (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Darth", "Vader", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Patrick", "Star", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sandy", "Squirl", null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Bread", "Top", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Shelby", "Chanyo", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tony", "Hawk", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Mean", 2, 7);