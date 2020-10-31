DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department( 
id INTEGER (11) AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);
CREATE TABLE roles( 
id INTEGER (11) AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DEC(10,2) NOT NULL,
department_id INTEGER (11),
-- FOREIGN KEY (department_id) REFERENCES department(id),
PRIMARY KEY (id)
);
CREATE TABLE employee( 
id INTEGER (11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER (11),
manager_id INTEGER (11) NULL,
-- FOREIGN KEY employee(role_id) REFERENCES roles (id),
-- FOREIGN KEY employee(manager_id) REFERENCES employee(id),
PRIMARY KEY (id)
);