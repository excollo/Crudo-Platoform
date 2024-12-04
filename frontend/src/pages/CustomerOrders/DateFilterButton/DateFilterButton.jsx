import React, { useState } from "react";
import { Button, Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const DateFilterButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState("All");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
        Date: {selectedDate}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          key="All"
          onClick={() => handleDateSelect("All")}
          selected={selectedDate === "All"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px", // Add gap between text and checkbox
            },
          }}
        >
          <ListItemText primary="All" />
          <Checkbox
            checked={selectedDate === "All"}
            sx={{
              color: selectedDate === "01 Year" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="Last 7 Days"
          onClick={() => handleDateSelect("Last 7 Days")}
          selected={selectedDate === "Last 7 Days"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="Last 7 Days" />
          <Checkbox
            checked={selectedDate === "Last 7 Days"}
            sx={{
              color: selectedDate === "Last 7 Days" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="30 Days"
          onClick={() => handleDateSelect("30 Days")}
          selected={selectedDate === "30 Days"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="30 Days" />
          <Checkbox
            checked={selectedDate === "30 Days"}
            sx={{
              color: selectedDate === "30 Days" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="45 Days"
          onClick={() => handleDateSelect("45 Days")}
          selected={selectedDate === "45 Days"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="45 Days" />
          <Checkbox
            checked={selectedDate === "45 Days"}
            sx={{
              color: selectedDate === "45 Days" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="06 Months"
          onClick={() => handleDateSelect("06 Months")}
          selected={selectedDate === "06 Months"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="06 Months" />
          <Checkbox
            checked={selectedDate === "06 Months"}
            sx={{
              color: selectedDate === "06 Months" ? "#926B6B" : "#926B6B", // Set tick mark color to #926B6B when selected
            }}
          />
        </MenuItem>
        <MenuItem
          key="01 Year"
          onClick={() => handleDateSelect("01 Year")}
          selected={selectedDate === "01 Year"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            "& .MuiListItemText-root": {
              marginRight: "12px",
            },
          }}
        >
          <ListItemText primary="01 Year" />
          <Checkbox
            checked={selectedDate === "01 Year"}
            sx={{
              color: selectedDate === "01 Year" ? "#926B6B" : "#926B6B",
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default DateFilterButton;
