import React, { useState, useEffect } from "react"; // Import React and hooks for state and lifecycle management
import axios from "axios"; // Import axios for making HTTP requests
import Select from "react-select"; // Import react-select for searchable dropdown component // Import CSS for styling

// Component for managing and displaying customer details
function CustomerDetails({ onCustomerUpdate }) {
  // State variables to manage customers list, selected customer, and customer details
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // Fetch customer data from API when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customers")
      .then((response) => setCustomers(response.data)) // Update customers state with fetched data
      .catch((error) => console.error("Error fetching customers", error)); // Log errors if fetching fails
  }, []);

  // Handle selection change in the dropdown
  const handleCustomerChange = (selectedOption) => {
    const customerId = selectedOption ? selectedOption.value : null; // Get selected customer ID
    const customer = customers.find((cust) => cust.PKID === customerId); // Find selected customer in the list

    // Update state with selected customer's details
    setSelectedCustomer(customer);
    setEmail(customer ? customer.Email : "");
    setPhoneNumber(customer ? customer.Mobile || customer.Phone : "");
    setAddress(customer ? customer.Address : "");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Customer Details:", { email, phoneNumber, address }); // Log updated details
    console.log("Selected Customer:", selectedCustomer); // Log selected customer
    onCustomerUpdate(selectedCustomer); // Call parent function to update customer
  };

  // Format customers list for the dropdown
  const customerOptions = customers.map((customer) => ({
    value: customer.PKID, // Use customer PKID as option value
    label: customer.Party || "No Name", // Use Party name or default label if name is missing
  }));

  return (
    <div className="customer-details">
      <form onSubmit={handleSubmit}>
        <h2>Order Form</h2>

        {/* Dropdown for selecting a customer */}
        <div className="customer-name-container">
          <label>Customer Name:</label>
          <Select
            options={customerOptions}
            onChange={handleCustomerChange}
            getOptionLabel={(e) => e.label} // Customize label display
            getOptionValue={(e) => e.value} // Customize value retrieval
            placeholder="Search and select a customer"
            isClearable
          />
        </div>

        {/* Input fields for customer details */}
        <div>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            value={phoneNumber || ""}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" placeholder="Enter age" />
        </div>

        <div>
          <label htmlFor="sex">Sex:</label>
          <select id="sex">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CustomerDetails;
