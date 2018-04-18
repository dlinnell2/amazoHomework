var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('tty-table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'bamazonDB'
});

connection.connect(function (err) {
    if (err) throw err;
    displayTable();
});

function displayTable(){
    
}