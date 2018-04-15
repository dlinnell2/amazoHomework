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
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    pickItems();
});

function pickItems() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) console.log(err);

        var header = [
            {
                alias: "ID",
                value: "item_id",
                align: "left",
                paddingLeft: 5,
                width: 10
            },
            {
                alias: "Product Name",
                value: "product_name",
                align: "left",
                paddingLeft: 5,
                width: 30
            },
            {
                alias: "Price",
                value: "price",
                width: 15,
                formatter: function (value) {
                    var str = "$" + value.toFixed(2);
                    return str;
                }
            }
        ];

        rows = [];

        for (item of res) {

            var newRow = [item.item_id, item.product_name, item.price];
            rows.push(newRow);
        }

        var t1 = Table(header, rows,{
            borderStyle: 1,
            borderColor: "blue",
            paddingBottom: 0,
            headerAlign: "center",
            align: "center",
        });

        var str1 = t1.render();
        console.log(str1);

        customerSelect();
    })
}

function customerSelect(){
    console.log('Success');
}
