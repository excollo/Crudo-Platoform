// Import the Express library
const express = require("express");

// Create a new router object to define route handlers
const router = express.Router();

// Import the getCustomers function from the customer controller
const { getCustomers } = require("../controllers/customerController");

// Import the getProducts function from the product controller
const { getProducts } = require("../controllers/productController");

// Define a route for GET requests to '/customers' that invokes the getCustomers function
router.get("/customers", getCustomers);

// Define a route for GET requests to '/product' that invokes the getProducts function
router.get("/product", getProducts);

// Export the router to make it available for use in other modules
module.exports = router;
