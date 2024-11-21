// Import the Order model to interact with the database for order-related operations
const Order = require("../models/orderModel");

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    // Destructure customer, products, and totalMRP (total Maximum Retail Price) from the request body
    const { customer, products, totalMRP } = req.body;

    // Create a new Order instance with the provided details
    const newOrder = new Order({ customer, products, totalMRP });

    // Save the new order to the database
    await newOrder.save();

    // Send a success response with the created order details
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error:", err);

    // Handle any errors and send a 500 response with an error message
    res.status(500).json({
      message: "Error creating order",
      error: err.message, // Include the error message for more context
    });
  }
};

// Export the createOrder function to be used in route handlers
module.exports = {
  createOrder,
};
