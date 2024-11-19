const Order = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const { customer, products, totalMRP } = req.body;
    const newOrder = new Order({ customer, products, totalMRP });
    await newOrder.save();
    res.status(201).json(
      {
        message: "Order created successfully",
        order: newOrder,
      },
    );
  } catch (err) {
    res.status(500).json({
      message: 'Error creating order',  
      error: err.message,
    });
  }
};

module.exports = {
  createOrder,
};
