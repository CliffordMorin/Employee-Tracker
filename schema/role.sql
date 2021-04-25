CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

-- ALTER TABLE roles
-- ADD FOREIGN KEY(department_id) REFERENCES departments(id);

