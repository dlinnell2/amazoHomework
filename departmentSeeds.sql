CREATE DATABASE IF NOT EXISTS bamazonDB;

USE bamazonDB;

CREATE TABLE departments (

  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NOT NULL,
  overhead_costs DECIMAL(10, 2) NOT NULL,
  product_sales DECIMAL(10, 2),
  PRIMARY KEY (department_id)

);

INSERT INTO departments (department_name, overhead_costs)
VALUE ('Electronics', 430);

INSERT INTO departments (department_name, overhead_costs)
VALUE ('Musical Instruments', 212);

INSERT INTO departments (department_name, overhead_costs)
VALUE ('Food', 175);

INSERT INTO departments (department_name, overhead_costs)
VALUE ('Cleaning Supplies', 189);
