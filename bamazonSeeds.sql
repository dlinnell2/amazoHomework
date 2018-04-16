CREATE DATABASE IF NOT EXISTS bamazonDB;

USE bamazonDB;

CREATE TABLE products (

  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Record Player', 'Electronics', 250, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Electric Guitar', 'Musical Instruments', 350, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo 64', 'Electronics', 50, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Casio Keyboard', 'Musical Instruments', 120, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bag of Steel Cut Oats', 'Food', 7.45, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Pistachios', 'Food', 2.25, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Froot Loops', 'Food', 3.50, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dawn Dish Soap', 'Cleaning Supplies', 2.23, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Barkeepers Friend', 'Cleaning Supplies', 4, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('CLR', 'Cleaning Supplies', 3.33, 32);