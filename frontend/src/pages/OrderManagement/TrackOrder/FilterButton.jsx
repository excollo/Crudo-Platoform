import React, { useState } from "react";
import { Button, Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const FilterButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState("All Orders");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateSelect = (date) => {
    setSelected(date);
  };

  return (
    <>
      <Button
        variant="contained"
        component={RouterLink}
        onClick={handleClick}
        sx={{
          backgroundImage:
            "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Gradient background
          color: "white", // White text color
          textTransform: "none", // No text transformation (no uppercase)
          "&:hover": {
            backgroundImage:
              "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Keep gradient on hover
          },
        }}
      >
        Filter
        <FontAwesomeIcon icon={faFilter} style={{ marginLeft: "8px" }} />
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          key="All Orders"
          onClick={() => handleDateSelect("All Orders")}
          selected={selected === "All Orders"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px", // Add gap between text and checkbox
            },
          }}
        >
          <ListItemText primary="All Orders" />
          <Checkbox
            checked={selected === "All Orders"}
            sx={{
              color: selected === "All Orders" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="Pending Orders"
          onClick={() => handleDateSelect("Pending Orders")}
          selected={selected === "Pending Orders"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Pending Orders" />
          <Checkbox
            checked={selected === "Pending Orders"}
            sx={{
              color: selected === "Pending Orders" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="Out for Delivery"
          onClick={() => handleDateSelect("Out for Delivery")}
          selected={selected === "Out for Delivery"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Out for Delivery" />
          <Checkbox
            checked={selected === "Out for Delivery"}
            sx={{
              color: selected === "Out for Delivery" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="Shipped Orders"
          onClick={() => handleDateSelect("Shipped Orders")}
          selected={selected === "Shipped Orders"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Shipped Orders" />
          <Checkbox
            checked={selected === "Shipped Orders"}
            sx={{
              color: selected === "Shipped Orders" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="Cancelled Orders"
          onClick={() => handleDateSelect("Cancelled Orders")}
          selected={selected === "Cancelled Orders"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Cancelled Orders" />
          <Checkbox
            checked={selected === "Cancelled Orders"}
            sx={{
              color: selected === "Cancelled Orders" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterButton;
