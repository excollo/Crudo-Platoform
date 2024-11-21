// Importing necessary dependencies and components
import React from "react";
// Importing icons from lucide-react for use in the sidebar menu
import {
  Home,
  BarChart2,
  FileText,
  ShoppingCart,
  ClipboardList,
  Settings,
  User,
} from "lucide-react";
// Importing the logo image to display in the sidebar
import logo from "../../assets/images/logo.svg";
// Importing CSS file for styling the Sidebar component
import "./Sidebar.css";

// Sidebar component that displays a navigation menu
const Sidebar = () => {
  // Defining the menu items array, which includes the icon, label, and path for each menu item
  const menuItems = [
    { icon: <Home size={24} />, label: "Dashboard", path: "/dashboard" }, // Dashboard item
    { icon: <BarChart2 size={24} />, label: "Analytics", path: "/analytics" }, // Analytics item
    {
      icon: <FileText size={24} />,
      label: "Prescription Management",
      path: "/prescriptions", // Prescription Management item
    },
    {
      icon: <ShoppingCart size={24} />,
      label: "Order Management",
      path: "/create-order", // Order Management item
    },
    {
      icon: <ClipboardList size={24} />,
      label: "Audit Log",
      path: "/audit", // Audit Log item
    },
    {
      icon: <Settings size={24} />,
      label: "Settings",
      path: "/settings", // Settings item
    },
  ];

  return (
    // Main container for the Sidebar component
    <div className="container-1">
      {/* Sidebar logo section, displaying the company logo */}
      <div className="logo-image">
        <img src={logo} alt="Logo" /> {/* Displaying the logo image */}
      </div>

      {/* Navigation menu section */}
      <nav className="image-1">
        {/* Unordered list to display menu items */}
        <ul>
          {menuItems.map((item, index) => (
            // Mapping through menuItems array to generate list items for each menu
            <li key={index}>
              {/* Anchor tag linking to the specified path */}
              <a href={item.path}>
                {/* Displaying the icon for each menu item */}
                <span>{item.icon}</span>
                {/* Displaying the label for each menu item */}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User section, likely for profile or settings */}
      <div>
        <div>
          <div>
            {/* Displaying the User icon, probably for user-related actions */}
            <User size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting Sidebar component to be used in other parts of the application
export default Sidebar;
