import React from "react";
import AppBar from "@mui/material/AppBar";
import { Link as RouterLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  NotificationsOutlined as NotificationsIcon,
} from "@mui/icons-material";

const TopBar = () => {
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "transparent",
        border: 0,
        color: "black",
        boxShadow: "none",
        zIndex: (theme) => theme.zIndex.drawer + 1, // Adjust based on your sidebar width
        width: "calc(101.5%)",
        ml: 5,
        mt: -6,
        mb: 4,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            component={RouterLink}
            to="/create-order"
            sx={{
              color: "rgb(57, 49, 57)",
              fontWeight: "300",
              fontSize: "30px",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: "rgb(7, 5, 7)",
              },
            }}
          >
            Create Order
          </Typography>
          <ChevronRightIcon sx={{ mx: 1, color: "text.secondary" }} />
          <Typography
            variant="body1"
            component={RouterLink}
            to="/track-order"
            sx={{
              color: "rgb(57, 49, 57)",
              fontWeight: "300",
              fontSize: "30px",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: "rgb(7, 5, 7)",
              },
            }}
          >
            Track Orders
          </Typography>
          <ChevronRightIcon
            sx={{ mx: 1, color: "primary.main", fontSize: "10px" }}
          />
          <Typography
            variant="body1"
            sx={{ color: "text.primary", fontWeight: "bold", fontSize: "30px" }}
          >
            Order Details
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/create-order"
            sx={{
              backgroundImage:
                "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))",
              color: "white",
              textTransform: "none",
              px: 3,
              "&:hover": {
                backgroundImage:
                  "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))",
              },
            }}
          >
            Create Order
          </Button>
          <IconButton
            size="large"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(232, 180, 180, 0.04)",
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
