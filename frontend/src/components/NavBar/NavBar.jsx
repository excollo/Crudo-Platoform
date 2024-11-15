import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="container-2">
      <h1 className="heading-tag-1">Create Order</h1>
      <div className="inputs-1">
        <input type="search" placeholder="Search" aria-label="Search" />
        <button>Track Orders</button>
        <div>
          <IoMdNotificationsOutline />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
