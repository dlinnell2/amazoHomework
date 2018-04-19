# Bamazon

## Customer

When running the customer view, the first thing seen is table showing all available files and the item's price. The customer is then prompted to enter the ID of the product as shown in the table, and asked how many of that product they would like to purchase. The system then logs out the total, and the sale is logged in the database. This adds to the total product sales and subtracts from the quantity of the item in stock.

If the customer tries to buy more of an item than what is currently in stock, the sale is rejected.

After each purchase, the customer is asked if they would like to continue shopping.

## Manager

On running the manager view, the user is presented with four options.

- View products in inventory
  - Displays all products available for purchase

- View low inventory
  - Displays all products available for purchase with an inventory of 3 or less

- Add to inventory
  - Allows a user allow a specified amount of an item to inventory

- Add new product
  - Allows a user to add an entirely new product to the store