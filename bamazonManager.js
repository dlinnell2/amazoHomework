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
    if (err) console.log(err);
    managerChoices();
});

function managerChoices() {

    var managerTasks = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'];

    inquirer.prompt([
        {
            type: 'list',
            name: 'manager',
            message: 'Please choose the action you would like to perform',
            choices: managerTasks
        }
    ]).then(function (answer) {
        switch (answer.manager) {

            case managerTasks[0]:
                productView('SELECT * FROM products');
                break;

            case managerTasks[1]:
                productView('SELECT * FROM products WHERE stock_quantity < 5');
                break;

            case managerTasks[2]:
                addInventory();
                break;

            case managerTasks[3]:
                addProduct();
                break;

            case managerTasks[4]:
                console.log('Goodbye!')
                process.exit();
                break;
        };
    });
};

function productView(param) {
    connection.query(param, function (err, res) {
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
            },
            {
                alias: "Stock Quantity",
                value: "stock_quantity",
                width: 15,
            }
        ];

        var rows = [];

        for (item of res) {

            var newRow = [item.item_id, item.product_name, item.price, item.stock_quantity];
            rows.push(newRow);
        }

        var t1 = Table(header, rows, {
            borderStyle: 1,
            borderColor: "blue",
            paddingBottom: 0,
            headerAlign: "center",
            align: "center",
        });

        var str1 = t1.render();
        console.log(str1);

        managerChoices();

    });
};

function addInventory() {
    connection.query('SELECT * FROM products', function (err, res) {

        if (err) console.log(err);

        var currentItems = [];
        for (item of res) {
            currentItems.push(item.product_name);
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'choosenItem',
                message: 'Please select the item you would like to increase in inventory',
                choices: currentItems
            },
            {
                type: 'input',
                name: 'quantityAdded',
                message: 'Please enter the amount in inventory this item has increased by',
                validate: function (value) {
                    if ((!isNaN(value)) && (parseInt(value) > 0)) {
                        return true;
                    }
                    console.log('\nPlease enter a valid number');
                    return false;
                }
            }
        ]).then(function(answers){

            var currentStock;

            var choosenItem = answers.choosenItem;
            var quantityAdded = parseInt(answers.quantityAdded);

            for (item of res){
                if (choosenItem === item.product_name){
                    currentStock = item.stock_quantity;
                };
            };

            var newQuantity = currentStock + quantityAdded;

            connection.query('UPDATE products SET ? WHERE ?', [{
                stock_quantity: newQuantity
            },{
                product_name: choosenItem

            }], function(err, res){
                
                if (err) console.log(err);

                console.log(`You now have ${newQuantity} of ${choosenItem} in stock`);
                managerChoices();
                
            });
        });
    });
};

function addProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'product',
            message: 'What item would you like to add?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'How much will you charge for this item?',
            validate: function (value) {
                if ((!isNaN(value)) && (parseInt(value) > 0)) {
                    return true;
                }
                console.log('\nPlease enter a valid number');
                return false;
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many of this item do you have in stock?',
            validate: function (value) {
                if ((!isNaN(value)) && (parseInt(value) > 0)) {
                    return true;
                }
                console.log('\nPlease enter a valid number');
                return false;
            }
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department is this product under?'
        }
    ]).then(function(answers){
        connection.query('INSERT INTO products SET ?',{
            product_name: answers.product,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: answers.quantity
        }, function(err, res){
            if (err) console.log(err);

            console.log(`${answers.quantity} ${answers.product} added to inventory!`);

            managerChoices();
        });
    });
};