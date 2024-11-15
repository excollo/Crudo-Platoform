import React from "react"; // Import React// Import CSS for styling
import "./OrderSummary.css";

// OrderSummary component accepts customer and productList as props
const OrderSummary = ({ customer, productList }) => {
  // Calculate the total MRP by summing the price of each product times its quantity
  const totalMRP = productList.reduce(
    (total, product) => total + product.MRP * product.quantity,
    0
  );

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>

      {/* Display customer details */}
      <div className="customer-details">
        <p>
          <strong>Customer Name:</strong> {customer ? customer.Party : "N/A"}
        </p>
        <p>
          <strong>Contact Number:</strong>{" "}
          {customer ? customer.Mobile || customer.Phone : "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {customer ? customer.Email : "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {customer ? customer.Address : "N/A"}
        </p>
      </div>
      <div className="total-mrp">
        <h4>Total MRP: ₹{totalMRP}</h4>
      </div>
      <p>
        <strong>Additional Note</strong> 
        <textarea className="texting" name="" id=""></textarea>
      </p>
    </div>
  );
};

export default OrderSummary;
