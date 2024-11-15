import React from "react";
import {
  Home,
  BarChart2,
  FileText,
  ShoppingCart,
  ClipboardList,
  Settings,
  User,
} from "lucide-react";
import logo from "../../assets/images/logo.svg";
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={24} />, label: "Dashboard", path: "/dashboard" },
    { icon: <BarChart2 size={24} />, label: "Analytics", path: "/analytics" },
    {
      icon: <FileText size={24} />,
      label: "Prescription Management",
      path: "/prescriptions",
    },
    {
      icon: <ShoppingCart size={24} />,
      label: "Order Management",
      path: "/order",
    },
    { icon: <ClipboardList size={24} />, label: "Audit Log", path: "/audit" },
    { icon: <Settings size={24} />, label: "Settings", path: "/settings" },
  ];

  return (
      <div className="container-1">
        <div className="logo-image">
          <img src={logo} alt="" />
        </div>
        <nav className="image-1">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.path}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div>
            <div>
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
