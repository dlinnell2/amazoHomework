var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('tty-table');

var rows;
var header;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'bamazonDB'
});

connection.connect(function (err) {
    if (err) console.log(err);
    managerChoices();
});

function managerChoices(){
    inquirer.prompt([
        {
            type:'list',
            name: 'manager',
            message: 'Please choose the action you would like to perform',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function(answer){
        switch (answer.manager) {
            case 'View Products for Sale':
                console.log('Correct!')
            break;
        };
    });
};