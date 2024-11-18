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
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [abhaNumber, setAbhaNumber] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers", error));
  }, []);


  const handleCustomerChange = (selectedOption) => {
    const customerId = selectedOption ? selectedOption.value : null;
    const customer = customers.find((cust) => cust.PKID === customerId);

    setSelectedCustomer(customer);
    setEmail(customer ? customer.Email : "");
    setPhoneNumber(customer ? customer.Mobile || customer.Phone : "");
    setAddress(customer ? customer.Address : "");
    setAge(customer ? customer.Age : "");
    setSex(customer ? customer.Sex : "");
    setAbhaNumber(customer ? customer.AbhaNumber : "");

    // Update the parent component with the selected customer details
    onCustomerUpdate(customer || {});
  };

  const customerOptions = customers.map((customer) => ({
    value: customer.PKID,
    label: customer.UserName || "No Name",
  }));

  const handleSaveCustomerDetails = () => {
    const updatedDetails = {
      ...selectedCustomer,
      Email: email,
      Mobile: phoneNumber,
      Address: address,
      Age: age,
      Sex: sex,
      AbhaNumber: abhaNumber,
    };

    axios
      .post("http://localhost:3000/api/saveCustomerDetails", updatedDetails)
      .then((response) => {
        alert("Customer details saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving customer details", error);
        alert("Failed to save customer details.");
      });
  };

  const handleAgeChange = (e) => {
    const inputAge = e.target.value;

    // Allow only digits and a maximum of 2 characters (for ages 1-99)
    if (/^\d{0,2}$/.test(inputAge)) {
      const parsedAge = parseInt(inputAge);

      // Check if parsed age is within the valid range
      if (parsedAge >= 1 && parsedAge <= 99) {
        setAge(inputAge);
        onCustomerUpdate({
          ...selectedCustomer,
          Age: parsedAge,
          Email: email,
          Mobile: phoneNumber,
          Address: address,
        });
      } else {
        // If parsed age is invalid, clear the input field
        setAge("");
        alert("Please enter a valid age between 1 and 99.");
      }
    } else {
      // If input is not a valid number, clear the input field
      setAge("");
      alert("Please enter a valid age between 1 and 99.");
    }
  };

  const handleBlur = () => {
    const parsedAge = parseInt(age);
    if (age && (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 99)) {
      alert("Please enter a valid age between 1 and 99.");
      setAge(""); // Clear invalid age input
    }
  };

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

        <div>
          <div className="inline-1">
            <div className="inputs-width">
              <label htmlFor="contactNumber">
                Contact Number<span className="star">*</span>
              </label>
              <input
                type="number"
                id="contactNumber"
                value={phoneNumber || ""}
                placeholder="Enter contact number"
                onChange={(e) => {
                  const input = e.target.value;

                  // Allow only 10 digits
                  if (input.length <= 10) {
                    setPhoneNumber(input);
                    onCustomerUpdate({
                      ...selectedCustomer,
                      Mobile: input,
                      Email: email, // Preserve current email
                      Address: address, // Preserve current address
                    });
                  }
                }}
                onBlur={() => {
                  if (phoneNumber && phoneNumber.length !== 10) {
                    alert("Contact number must be exactly 10 digits.");
                  }
                }}
                required
              />
            </div>

            <div className="inputs-width">
              <label htmlFor="email">
                Email<span className="star">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email || ""}
                placeholder="Enter email"
                onChange={(e) => {
                  const input = e.target.value;
                  setEmail(input);
                  onCustomerUpdate({
                    ...selectedCustomer,
                    Email: input,
                    Mobile: phoneNumber, // Preserve current phone number
                    Address: address, // Preserve current address
                  });
                }}
                onBlur={() => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email
                  if (email && !emailRegex.test(email)) {
                    alert(
                      "Please enter a valid email address with '@' or a domain name."
                    );
                  }
                }}
                required
              />
            </div>
          </div>

          <div className="inline-2">
            <div className="inputs-width-2">
              <label htmlFor="age">
                Age<span className="star">*</span>
              </label>
              <input
                type="number"
                id="age"
                placeholder="Enter age"
                value={age}
                onChange={handleAgeChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="inputs-width-3">
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

            <div className="inputs-width-4">
              <label htmlFor="ABHA">ABHA Number</label>
              <input
                type="number"
                id="ABHA"
                value={abhaNumber || ""}
                placeholder="Enter contact number"
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only 10 digits
                  if (value.length <= 14) {
                    setAbhaNumber(value);

                  }
                }}
                onBlur={() => {
                  if (abhaNumber && abhaNumber.length !== 14) {
                    alert("Contact number must be exactly 14 digits.");
                  }
                }}
                required
              />
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
                Email: email,
                Mobile: phoneNumber,
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
