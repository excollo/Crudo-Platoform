// Import the Order model to interact with the database for order-related operations
const Order = require("../models/orderModel");
const axios = require("axios");
const { fetchOrderDetails } = require("../utils/fetchData");

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    // Destructure customer, products, and totalMRP (total Maximum Retail Price) from the request body
    const { customer, products, totalMRP } = req.body;

    // Create a new Order instance with the provided details
    const newOrder = new Order({ customer, products, totalMRP });

    // Save the new order to the database
    await newOrder.save();

    const prodDtl = [];

    for(const product of products){
      const {productId,quantity,price} = product;
      prodDtl.push({
        Batch: "ABC",
        PklotId: 0,
        FkProdID: productId,
        MRP: price * quantity,
        Qty: quantity,
        QtyUnit: 1,
        Rate: price,
      });
    }

    const swilERPData = {
      ApplyPromotion: false,
      DraftMode: 0,
      FkPartyID: customer.customerId,
      FkReferByID: 0,
      FkSalesPerID: 0,
      FkSeriesID: 10000013,
      Party: "",
      ProdDtl: prodDtl,
    };

    console.log(swilERPData);

    const response = await axios.post(
      "https://api-test.swilerp.com/erp/v1/api/transaction/salesorder/CreateSalesOrdMobile",
      swilERPData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SWIL_API_KEY}`,
        },
      }
    )

    console.log("SwilERP Response:", response.data);

    // Send a success response with the created order details
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
      swilERPResponse: response.data,
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

const orderDetails = async (req,res) => {
  const {id,FkID} = req.query;
  try {
    const orderDetail = await fetchOrderDetails(id,FkID);
    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order details",
      error: error.message,
    });
  }
}

// Export the createOrder function to be used in route handlers
module.exports = {
  createOrder,
  orderDetails,
};
