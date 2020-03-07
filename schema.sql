DROP DATABASE [IF EXISTS] meuixCMS_DB;

CREATE DATABASE meuixCMS_DB;

USE meuixCMS_DB;

CREATE TABLE department (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name) VALUES ('management'), ('sales'), ('accounting'), ('production');
INSERT INTO role (title, salary, department_id) VALUES ('CEO', 90000, 1), ('Account Manager', 60000, 2), ('Lead Accountant', 75000, 3), ('Production Coordinator', 35000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 1, NULL), ('Jack', 'Winters', 2, 1), ('Sarah', 'Day', 3, 1), ('Christa', 'Williams', 4, 2);