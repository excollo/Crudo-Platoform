const {fetchOrderFulfillment,fetchAllStatusList,fetchTrackOrder} = require('../utils/fetchData');

const orderFulfillment = async (req, res) => {
  try {
    const orderFulfillmentData = await fetchOrderFulfillment();
    
    // Log the number of items retrieved
    console.log(`Retrieved ${orderFulfillmentData.length} order fulfillment items`);
    
    res.json(orderFulfillmentData);
  } catch (error) {
    console.error("Error fetching order fulfillment", error);
    res.status(500).json({
      message: "Error fetching order fulfillment",
      error: error.message,
    });
  }
};

const orderStatusList = async (req, res) => {
    try {
        const orderStatusListData = await fetchAllStatusList();
        
        // Log the number of items retrieved
        console.log(`Retrieved ${orderStatusListData.length} order status list items`);
        
        res.json(orderStatusListData);
    } catch (error) {
        console.error("Error fetching order status list", error);
        res.status(500).json({
        message: "Error fetching order status list",
        error: error.message,
        });
    }
}

const trackOrderList = async (req,res) => {
    try{
        const trackOrderListData = await fetchTrackOrder();
        
        // Log the number of items retrieved
        console.log(`Retrieved ${trackOrderListData.length} track order list items`);
        
        res.json(trackOrderListData);
    }
    catch(error){
        console.error("Error fetching track order list", error);
        res.status(500).json({
            message: "Error fetching track order list",
            error: error.message
        });
    }
}

module.exports = {
    orderFulfillment,
    orderStatusList,
    trackOrderList
}