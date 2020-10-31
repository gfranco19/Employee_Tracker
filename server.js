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
            "View all roles",
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

            case "Update employee role":
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

function newEmployee() {
    const roleArray = [];
    connection.query("SELECT id, title FROM roles", (err, res) => {
      if(err) throw err;
      for(let i = 0; i < res.length; i++) {
        roleArray.push(res[i].title)
      }
      inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the their last name?"
        },
        {
          type: "list",
          name: "role",
          message: "What is the their role?",
          choices: roleArray
        },
        {
          type: "input",
          name: "manager",
          message: "What is the their manager's id number? (If none, leave blank)"
        }
      ]).then((answers) => {
        if(answers.manager === "") {
          answers.manager = null;
        }
        for(let i = 0; i < res.length; i++) {
          if(answers.role === res[i].title) {
            roleID = res[i].id;
          }
        }
        connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",[answers.first_name, answers.last_name, roleID, answers.manager], (err, response) => {
          if(err) throw err;
          console.log("Employee added");
          questions();
        })
      })
    })
  }

function newDepartment() {
    inquirer.prompt([{
        type: "input",
        message: "What is the name of the new department you want to add?",
        name: "department"
    }, ]).then(function(answer) {
        connection.query('INSERT INTO department(name) VALUES (?)', [answer.department], function(err, response) {
            if (err) throw err;
            console.table("Successfully Inserted");
            questions();
        })
    })
}


function newRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table("Successfully Inserted",data);

        })
        questions();
    })

}


function updateRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table("Successfully Inserted", data);
        })
        questions();
    })

}