// Import the Axios library for making HTTP requests
const axios = require("axios");
const Order = require("../models/orderModel");
// Load environment variables from a .env file
require("dotenv").config();

// Define the base URL for the test API endpoint
const TEST_BASE = "https://api-test.swilerp.com/erp/v1/";

// Get the API key from environment variables
const SWIL_API_KEY = process.env.SWIL_API_KEY;

// Set up headers with the Authorization token for API requests
const headers = {
  Authorization: `Bearer ${SWIL_API_KEY}`,
};

// Function to fetch a paginated list of customers
const fetchCustomer = async (pageNo = 1, pageSize = -1, search = "") => {
  try {
    // Send a POST request to the customer list endpoint with pagination and search parameters
    const response = await axios.post(
      `${TEST_BASE}api/master/customer/List`,
      {},
      {
        headers,
        params: { pageno: pageNo, pagesize: pageSize, search },
      }
    );
    // Return the customer data from the response or an empty array if no data is found
    return response.data || [];
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error fetching customers", error);
    return [];
  }
};

// Function to fetch a paginated list of products
const fetchProduct = async (pageNo = 1, pageSize = -1, search = "") => {
  try {
    // Send a POST request to the product list endpoint with pagination and search parameters
    const response = await axios.post(
      `${TEST_BASE}api/master/Product/list`,
      {},
      {
        headers,
        params: { pageNo, pageSize, search },
      }
    );
    // Return the product data from the response or an empty array if no data is found
    return response.data || [];
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error fetching product list:", error);
    return [];
  }
};

// Function to fetch order details by ID
const fetchOrderDetails = async (id = 1714,FkID = 3) => {
  try{
    const response = await axios.post(`${TEST_BASE}api/transaction/salesorder/GetByIDMobile`,{}
      ,{
        headers,
        params: {id,FkID}
      }
    );
    return response.data || [];
  }
  catch(error){
    console.error("Error fetching order details",error);
    return [];
  }
}

// Function to fetch a customer's orders by customer ID
const fetchCustomerOrders = async (customerId) => {
  try{
    const orders = await Order.find({'customer.customerId': customerId})
      .sort({createdAt: -1})
      return orders;
  }
  catch(error){
    console.error("Error fetching customer orders",error);
    return [];
  }
}

// Export the fetchCustomer and fetchProduct functions to make them accessible in other modules
module.exports = {
  fetchCustomer,
  fetchProduct,
  fetchOrderDetails,
  fetchCustomerOrders
};
