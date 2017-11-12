// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// MySQL connection set-up
var connection = mysql.createConnection({
  host: "localhost",
  port: 3200,

  //  username
  user: "BamazonHW",

  // password
  password: "DummyPassword",
  database: "BamazonHW"
});

// Main function
var manageInit = function() {
  // Menu to select from 4 functions
  inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Things to do for Manager",
      choices: [
        "For Sale",
        "Count Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ]).then(function(answers) {
    if(answers.option === "View Products for Sale") {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;


        for(var i = 0; i < res.length; i++) {
          if(res[i].stock_quantity > 0) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price.toFixed(2) + " | In Stock: " + res[i].stock_quantity);
          }
        }

        // Loops back to the beginning of the app so that user can use again
        manageInit();
      });
    //Psuado - not finished
    }
  });
};

// Initialize
manageInit();