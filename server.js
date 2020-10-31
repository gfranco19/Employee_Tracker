const mysql = require('mysql');
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Clintb00.",
    database: "employee_trackerdb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    questions();
});

function questions() {
    inquirer.prompt({
        message: "How can i help you today?",
        type: "list",
        choices: [
            "View all employees",
            "View all departments",
            "Add employee",
            "Add department",
            "Add role",
            "Update employee role",
            "RETURN"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "View all employees":
                viewEmployees();
                break;

            case "View all departments":
                viewDepartments();
                break;

            
            case "View all roles":
                viewRoles();
                break;

            case "Add employee":
                newEmployee();
                break;

            case "Add department":
                newDepartment();
                break;

            case "Add role":
                newRole();
                break;

            case "update employee role":
                updateRole();
                break;

            default:
                connection.end();
                break;
        }
    });
}
//command to view all from employee table
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        questions();
    });
}
//command to view all from department table
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        questions();
    });
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, data) {
        console.table(data);
        questions();
    });
}

