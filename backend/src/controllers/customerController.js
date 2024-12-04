// Import the fetchCustomer function from the fetchData utility module
const { fetchCustomer,fetchCustomerOrders } = require("../utils/fetchData");

// Define an asynchronous function to handle the GET request for customers
const getCustomers = async (req, res) => {
  // Extract page number, page size, and search query from the request query parameters
  // Set default values if not provided: pageNo = 1, pageSize = 2, search = ''
  const { pageNo = 1, pageSize = -1, search = "" } = req.query;

  try {
    // Call fetchCustomer to retrieve customers based on page number, page size, and search query
    const customers = await fetchCustomer(pageNo, pageSize, search);

    // Respond with the fetched customers as a JSON object
    res.json(customers);
  } catch (error) {
    // Handle any errors during customer fetching
    // Respond with a 500 status and an error message in JSON format
    res.status(500).json({
      message: "Error fetching customers",
      error: error.message,
    });
  }
};

const getCustomerOrders = async (req,res) => {
  const customerId = req.params.customerId;
  try{
    if(!customerId){
      return res.status(400).json({
        message: "Customer ID is required",
      })
    }

    const customerOrders = await fetchCustomerOrders(customerId);

    res.json({
      message: "Customer orders fetched successfully",
      orders: customerOrders.length,
      orders: customerOrders,
    })
  }
  catch(error){
    res.status(500).json({
      message: "Error fetching customer orders",
      error: error.message,
    })
  }
}

// Export the getCustomers function to make it available for other modules
module.exports = {
  getCustomers,
  getCustomerOrders,
};
