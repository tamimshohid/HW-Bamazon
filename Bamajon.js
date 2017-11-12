// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// Global variable
var runningTotal = 0;

// SQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3100,

  // Your username
  user: "BamazonHW",

  // Your password
  password: "DummyPassword",
  database: "BamazonHW"
});

var shopTime = function() {
	
	connection.query("SELECT * FROM products", function(err, res) {
	  if (err) throw err;
	  
	  // Runs through each item in database
	  for(var i = 0; i < res.length; i++) {
	  	console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price.toFixed(2));
	  }

	  inquirer.prompt([
	  	{
	  		type: "input",
	  		name: "itemId",
	  		message: "Enter the ID number of the product you'd like to buy:",
	  		validate: function(value) {
	  			if(isNaN(value) === false && value > 0 && value < res.length + 1) {
	  				return true;
	  			} else {
	  				return false;
	  			}
	  		}
	  	},
	  	{
	  		type: "input",
	  		name: "itemDemand",
	  		message: "How many would you like to buy?",
	  		validate: function(value) {
	  			if(isNaN(value) === false && value > 0) {
	  				return true;
	  			} else {
	  				return false;
	  			}
	  		}
	  	},
	  ]).then(function(answers) {
	  	var itemId = answers.itemId;
	  	var itemDemand = answers.itemDemand;

	 
	  		// Loop the app so that user can attempt another purchase
	  		inquirer.prompt([
	  			{
	  				type: "confirm",
	  				name: "confirm",
	  				message: "Would you like to try and make another purchase?"
	  			}
	  		]).then(function(answers) {
	  			if(answers.confirm) {
	  				shopTime();
	  			}
	  		});
	  	} else {
	  		// Need to work on - If quantity to purchase is valid, then update database with new stock quantity
	  		
	  		// Need to work on - Shows purchase total and running total of session's order
	  	

	  		// Need to work on - Option to make another purchase after successful purchase
	  		
	  	}
	  });
	});
};

// Initialize
shopTime();