import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./CustomerDetails.css";

function CustomerDetails({ onCustomerUpdate }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    Email: "",
    Mobile: "",
    Address: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers", error));
  }, []);

  const handleInputChange = (field, value) => {
  const updatedDetails = {
    ...customerDetails,
    [field]: value,
  };
  setCustomerDetails(updatedDetails);
  onCustomerUpdate(updatedDetails);
};

  const handleCustomerChange = (selectedOption) => {
    const customerId = selectedOption ? selectedOption.value : null;
    const customer = customers.find((cust) => cust.PKID === customerId);

    const updatedCustomer = {
      ...selectedCustomer,
      ...customer,
    }

    setSelectedCustomer(customer);
    setEmail(customer ? customer.Email : "");
    setPhoneNumber(customer ? customer.Mobile || customer.Phone : "");
    setAddress(customer ? customer.Address : "");

    // Update the parent component with the selected customer details
    onCustomerUpdate(customer || {});
  };

  const customerOptions = customers.map((customer) => ({
    value: customer.PKID,
    label: customer.UserName || "No Name",
  }));

  return (
    <div className="customer-details-card">
      <form className="form-handling">
        <h2>Customer Details</h2>

        <div className="form-group">
          <label>
            Customer Name<span className="star">*</span>
          </label>
          <Select
            className="select-input"
            options={customerOptions}
            onChange={handleCustomerChange}
            placeholder="Search and select a customer"
            isClearable
          />
        </div>

        <div className="inputs-width">
          <div className="inline-1">
            <div>
              <label htmlFor="contactNumber">
                Contact Number<span className="star">*</span>
              </label>
              <input
                type="number"
                id="contactNumber"
                value={phoneNumber || ""}
                placeholder="Enter contact number"
                onChange={(e) => {
                  const updatePhoneNumber = e.target.value;
                  setPhoneNumber(updatePhoneNumber);
                  onCustomerUpdate({
                    ...selectedCustomer,
                    Mobile: updatePhoneNumber,
                  });
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="email">
                Email<span className="star">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email || ""}
                placeholder="Enter email"
                onChange={(e) => {
                  const updateEmail = e.target.value;
                  setEmail(updateEmail);
                  onCustomerUpdate({
                    ...selectedCustomer,
                    Email: updateEmail,
                  });
                }}
              />
            </div>
          </div>

          <div className="inline-2">
            <div>
              <label htmlFor="age">
                Age<span className="star">*</span>
              </label>
              <input type="number" id="age" placeholder="Enter age" />
            </div>

            <div>
              <label htmlFor="sex">
                Sex<span className="star">*</span>
              </label>
              <select id="sex">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">
            Address<span className="star">*</span>
          </label>
          <textarea
            id="address"
            value={address || ""}
            onChange={(e) => {
              const updateAddress = e.target.value;
              setAddress(updateAddress);
              onCustomerUpdate({
                ...selectedCustomer,
                Address: updateAddress,
              });
            }}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default CustomerDetails;
