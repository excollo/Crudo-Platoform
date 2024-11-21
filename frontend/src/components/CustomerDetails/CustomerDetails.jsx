import React, { useState, useEffect } from "react"; // Importing React hooks for state and effect management
import axios from "axios"; // Importing axios for API requests
import Select from "react-select"; // Importing react-select for dropdown select component
import "./CustomerDetails.css"; // Importing custom CSS for styling

function CustomerDetails({ onCustomerUpdate, onAddressUpdate }) {
  // Defining state variables for customer details
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [abhaNumber, setAbhaNumber] = useState("");

  // Fetch customer data from the API on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/customers")
      .then((response) => setCustomers(response.data)) // Set customer data to state
      .catch((error) => console.error("Error fetching customers", error)); // Handle any errors
  }, []); // Empty dependency array ensures the effect runs only once

  // Handle customer selection change
  const handleCustomerChange = (selectedOption) => {
    if (!selectedOption) {
      // If no customer is selected, reset the customer details
      setSelectedCustomer(null);
      setEmail("");
      setPhoneNumber("");
      setAge("");
      setSex("");
      setAbhaNumber("");
      setAddress1("");
      setAddress2("");
      setPostalCode("");
      setCity("");
      setState("");

      // Inform parent component that the customer details are cleared
      onCustomerUpdate({});
      return;
    }

    const customerId = selectedOption.value;
    const customer = customers.find((cust) => cust.PKID === customerId); // Find the selected customer

    // Set the selected customer's details to state
    setSelectedCustomer(customer);
    setEmail(customer ? customer.Email : "");
    setPhoneNumber(customer ? customer.Mobile || customer.Phone : "");
    setAge(customer ? customer.Age : "");
    setSex(customer ? customer.Sex : "");
    setAbhaNumber(customer ? customer.AbhaNumber : "");

    if (customer && customer.Address) {
      const addressParts = customer.Address.split(", "); // Split the address string into components
      setAddress1(addressParts[0] || "");
      setAddress2(addressParts[1] || "");
      setPostalCode(addressParts[2] || "");
      setCity(addressParts[3] || "");
      setState(addressParts[4] || "");
    }

    // Update parent component with selected customer details
    onCustomerUpdate({
      ...customer,
      Address: customer.Address || "",
    });
  };

  // Generate customer options for the Select dropdown
  const customerOptions = customers.map((customer) => ({
    value: customer.PKID,
    label: customer.UserName || "No Name",
  }));

  // Handle age input change, ensuring it's a valid number and within a specific range
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
          Address: `${address1}, ${address2}, ${postalCode}, ${city}, ${state}`,
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

  // Handle blur event to validate the age field
  const handleBlur = () => {
    const parsedAge = parseInt(age);
    if (age && (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 99)) {
      alert("Please enter a valid age between 1 and 99.");
      setAge(""); // Clear invalid age input
    }
  };

  // Update the parent component with the full address whenever address fields change
  useEffect(() => {
    const fullAddress = `${address1} ${address2} ${postalCode} ${city} ${state}`;

    // Notify parent component with the full address
    onAddressUpdate(fullAddress);

    if (selectedCustomer) {
      onCustomerUpdate({
        ...selectedCustomer,
        Address: fullAddress,
        Email: email,
        Mobile: phoneNumber,
      });
    }
  }, [
    address1,
    address2,
    postalCode,
    city,
    state,
    onAddressUpdate,
    selectedCustomer,
    onCustomerUpdate,
  ]);

  return (
    <div className="customer-details-card">
      {/* Form for capturing customer details */}
      <form className="form-handling">
        <h2>Customer Details</h2>

        {/* Customer selection dropdown */}
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
              {/* Contact number input */}
              <label htmlFor="contactNumber">
                Contact Number<span className="star">*</span>
              </label>
              <input
                type="number"
                id="contactNumber"
                value={phoneNumber}
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
                      Address: `${address1}, ${address2}, ${postalCode}, ${city}, ${state}`, // Preserve current address
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
              {/* Email input */}
              <label htmlFor="email">
                Email<span className="star">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => {
                  const input = e.target.value;
                  setEmail(input);
                  onCustomerUpdate({
                    ...selectedCustomer,
                    Email: input,
                    Mobile: phoneNumber, // Preserve current phone number
                    Address: `${address1}, ${address2}, ${postalCode}, ${city}, ${state}`, // Preserve current address
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
              {/* Age input */}
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
              {/* Sex dropdown */}
              <label htmlFor="sex">
                Sex<span className="star">*</span>
              </label>
              <select
                id="sex"
                value={sex}
                onChange={(e) => {
                  const selectedSex = e.target.value;
                  setSex(selectedSex);
                  onCustomerUpdate({
                    ...selectedCustomer,
                    Sex: selectedSex,
                    Email: email,
                    Mobile: phoneNumber,
                    Address: `${address1} ${address2} ${postalCode} ${city} ${state}`,
                  });
                }}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="inputs-width-4">
              {/* ABHA Number input */}
              <label htmlFor="abhaNumber">
                ABHA Number<span className="star">*</span>
              </label>
              <input
                type="text"
                id="abhaNumber"
                value={abhaNumber}
                placeholder="Enter ABHA number"
                onChange={(e) => {
                  const input = e.target.value;
                  setAbhaNumber(input);
                  onCustomerUpdate({
                    ...selectedCustomer,
                    AbhaNumber: input,
                    Email: email,
                    Mobile: phoneNumber,
                    Address: `${address1} ${address2} ${postalCode} ${city} ${state}`,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerDetails;
