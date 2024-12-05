// Import the fetchCustomer and fetchCustomerOrders functions from the fetchData utility module
const { fetchCustomer, fetchCustomerOrders } = require("../utils/fetchData");
const axios = require("axios");
const Customer = require("../models/customerModel");

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

const createCustomer = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phoneNumber,
      alias,
      pincode,
      station,
      age,
      sex,
      address,
    } = req.body;

    const swilERPCustomerData = {
      Address: address,
      Customer: fullname,
      Email: email,
      Mobile: phoneNumber,
      Alias: alias,
      Pincode: pincode,
      Station: station,
    };

    const response = await axios.post(
      "https://api-test.swilerp.com/erp/v1/api/master/customer/CreateCustomerMobile",
      swilERPCustomerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SWIL_API_KEY}`,
        },
      }
    );

    console.log(
      "Swil ERP Response:",
      JSON.stringify(response.data, null, 2)
    );


    const swilId = response.data.PKID || response.data.Id || response.data.ID || response.data.id;

    if (!swilId) {
      throw new Error("Failed to receive Swil Customer ID");
    }

    const newCustomer = new Customer({
      fullname,
      email,
      phoneNumber,
      alias,
      pincode,
      station,
      age,
      sex,
      address,
      swilId,
    });

    await newCustomer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
      swilERPCustomerData: response.data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating customer",
      error: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phoneNumber,
      alias,
      pincode,
      station,
      age,
      sex,
      address,
      swilId,
    } = req.body;

    const swilERPUpdateCustomerData = {
      PKID: swilId,
      Address: address,
      Customer: fullname,
      Email: email,
      Mobile: phoneNumber,
      Alias: alias,
      Pincode: pincode,
      Station: station,
    };

    const response = await axios.post(
      "https://api-test.swilerp.com/erp/v1/api/master/customer/UpdateMobile",
      swilERPUpdateCustomerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SWIL_API_KEY}`,
        },
      }
    );

    // Remove save() method and add error handling for no document found
    const updatedCustomer = await Customer.findOneAndUpdate(
      { swilId: swilId },
      {
        fullname,
        email,
        phoneNumber,
        alias,
        pincode,
        station,
        age,
        sex,
        address,
      },
      { new: true, runValidators: true } // Added runValidators to ensure data validation
    );

    // Check if customer was found and updated
    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    console.log(swilERPUpdateCustomerData);

    res.status(201).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
      swilERPUpdateCustomerData: response.data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating customer",
      error: error.message,
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
  createCustomer,
  updateCustomer,
};
