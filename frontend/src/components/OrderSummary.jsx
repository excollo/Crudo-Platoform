import React from "react"; // Import React// Import CSS for styling

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
        <h4>Customer Details</h4>
        <p>
          <strong>Name:</strong> {customer ? customer.Party : "N/A"}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          {customer ? customer.Mobile || customer.Phone : "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {customer ? customer.Email : "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {customer ? customer.Address : "N/A"}
        </p>
      </div>

      {/* Display list of products */}
      <div className="product-list">
        <h4>Product List</h4>
        <ul>
          {productList.map((item, index) => (
            <li key={index}>
              <span>
                {item.label} - {item.quantity} pcs - ₹{item.MRP} each
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Display total MRP */}
      <div className="total-mrp">
        <h4>Total MRP: ₹{totalMRP}</h4>
      </div>
    </div>
  );
};

export default OrderSummary;
