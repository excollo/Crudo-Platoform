// Import React and icons from 'react-icons' for the notification and search icons
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io"; // Notification icon
import { CiSearch } from "react-icons/ci"; // Search icon (though not used here)
import "./TopBar.css"; // Import CSS file for styling the NavBar

// Define the NavBar component
const NavBar = () => {
  return (
    // The main navigation element (nav) with the class 'container-2' for styling
    <nav className="container-2">
      {/* Heading for the navbar, with the class 'heading-tag-1' for styling */}
      <h1 className="heading-tag-1">Create Order</h1>

      {/* Container for the search input, button, and notification icon */}
      <div className="inputs-1">
        {/* Search input with placeholder text and an accessible aria-label */}
        <input type="search" placeholder="Search" aria-label="Search" />

        {/* Button to track orders, styled using a button element */}
        <button>Track Orders</button>

        {/* Container for the notification icon */}
        <div>
          {/* Notification icon using the IoMdNotificationsOutline component */}
          <IoMdNotificationsOutline />
        </div>
      </div>
    </nav>
  );
};

// Export the NavBar component so it can be imported and used in other parts of the app
export default NavBar;
