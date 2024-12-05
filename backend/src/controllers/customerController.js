// Import the fetchCustomer and fetchCustomerOrders functions from the fetchData utility module
const { fetchCustomer, fetchCustomerOrders } = require("../utils/fetchData");

// Define an asynchronous function to handle the GET request for customers
const getCustomers = async (req, res) => {
  // Extract page number, page size, and search query from the request query parameters
  // Default values: pageNo = 1, pageSize = -1 (no limit), search = empty string
  const { pageNo = 1, pageSize = -1, search = "" } = req.query;

  try {
    // Call fetchCustomer to retrieve customers based on the provided filters
    const customers = await fetchCustomer(pageNo, pageSize, search);

    // Respond with the fetched customers as a JSON object
    res.json(customers);
  } catch (error) {
    // Handle any errors that occur during customer fetching
    res.status(500).json({
      message: "Error fetching customers", // User-friendly error message
      error: error.message, // Detailed error message
    });
  }
};

// Define an asynchronous function to handle the GET request for a customer's orders
const getCustomerOrders = async (req, res) => {
  // Extract the customerId from the request parameters
  const customerId = req.params.customerId;

  try {
    // Check if the customerId is provided
    if (!customerId) {
      // Respond with a 400 status and error message if customerId is missing
      return res.status(400).json({
        message: "Customer ID is required",
      });
    }

    // Fetch the customer's orders using the fetchCustomerOrders function
    const customerOrders = await fetchCustomerOrders(customerId);

    // Respond with the fetched orders as a JSON object
    res.json({
      message: "Customer orders fetched successfully", // Success message
      ordersCount: customerOrders.length, // Total number of orders
      orders: customerOrders, // List of orders
    });
  } catch (error) {
    // Handle any errors that occur during order fetching
    res.status(500).json({
      message: "Error fetching customer orders", // User-friendly error message
      error: error.message, // Detailed error message
    });
  }
};

// Export the getCustomers and getCustomerOrders functions to make them available to other modules
module.exports = {
  getCustomers,
  getCustomerOrders,
};
