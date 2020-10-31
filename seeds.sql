INSERT INTO department( name)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),("Lead Engineer",150000, 2),("Accounttant",125000, 3),("Leagal Team Lead",250000, 4),("Salesperson", 80000, 1),("Software Engineer",120000, 2),("Lawyer",190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John","Doe", 1, 3),("Mike","Chan", 5, 1),("Ashley","Rodriguez", 2, null),("Kevin","Tupik", 6, 3),("Malia","Brown", 3, null),("Sarah","Lourd", 4, null),("Tom","Allen", 7, 6);