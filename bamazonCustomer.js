var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('tty-table');

var rows;
var header;
var selectedItem;
var selectedQuantity;
var itemChoices;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'bamazonDB'
});

connection.connect(function (err) {
    if (err) throw err;
    pickItems();
});

function pickItems() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

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

        itemChoices = rows.length;

        var t1 = Table(header, rows, {
            borderStyle: 1,
            borderColor: "blue",
            paddingBottom: 0,
            headerAlign: "center",
            align: "center",
        });

        var str1 = t1.render();
        console.log(str1);

        customerSelect();
    });
};

function customerSelect() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item',
            message: 'Please enter the ID of the item you would like to purchase',
            validate: function (value) {
                if ((!isNaN(value)) && (parseInt(value) > 0) && (value <= itemChoices)) {
                    return true;
                }
                console.log('\nPlease enter a valid ID');
                return false;
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Please enter the quantity of the item you would like to purchase',
            validate: function (value) {
                if ((!isNaN(value)) && (parseInt(value) > 0)) {
                    return true;
                }
                console.log('\nPlease enter a valid number');
                return false;
            }
        }
    ]).then(function(answers){
        selectedItem = parseInt(answers.item);
        selectedQuantity = parseInt(answers.quantity);

        purchaseItems();
    });
};

function purchaseItems(){

    connection.query('SELECT * FROM products WHERE ?', {
        item_id: selectedItem
    }, function(err, res){
        if (err) throw err;

        var available = res[0].stock_quantity;
        var itemName = res[0].product_name;
        var currentSales = res[0].product_sales;

        if (available >= selectedQuantity){
            
            var newQuantity = available - selectedQuantity;
            var totalCost = (selectedQuantity * res[0].price).toFixed(2);
            var totalSales = parseInt(currentSales) + parseInt(totalCost);

            connection.query('UPDATE products SET ? WHERE ?', [{
                stock_quantity: newQuantity,
                product_sales: totalSales
            },{
                item_id: selectedItem

            }], function(err, res){
                
                if (err) throw err;

                console.log(`Thanks for purchasing ${selectedQuantity} ${itemName}! You spent a total of $${totalCost}`);
                continueShop();
                
            });

        } else {
            console.log(`Sorry! We don't have that many of the item available. Currently we have ${available} of that item available!`);

            continueShop();
        };
    });
};

function continueShop(){
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Would you like to continue shopping?'
        }
    ]).then(function(answers){
        if(answers.continue){
            pickItems();
        } else {
            console.log('Thanks for shopping!')
            process.exit();
        };
    });
};