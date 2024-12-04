// Import the Express library
const express = require("express");

// Create a new router object to define route handlers
const router = express.Router();

// Import the getCustomers function from the customer controller
const { getCustomers,getCustomerOrders } = require("../controllers/customerController");

// Import the getProducts function from the product controller
const { getProducts } = require("../controllers/productController");

// Define a route for GET requests to '/customers' that invokes the getCustomers function
router.get("/customers", getCustomers);

// Define a route for GET requests to '/product' that invokes the getProducts function
router.get("/product", getProducts);

router.get("/customerorders/:customerId/orders",(req,res,next) => {
    console.log(req.params.customerId);
    next();
}, getCustomerOrders);

// Export the router to make it available for use in other modules
module.exports = router;
