import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
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

const Sidebar = () => {
  const [selected, setSelected] = useState(window.location.pathname);

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
      path: "/create-order",
    },
    { icon: <ClipboardList size={24} />, label: "Audit Log", path: "/audit" },
    { icon: <Settings size={24} />, label: "Settings", path: "/settings" },
  ];

  return (
    <Box
      sx={{
        width: { xs: 80, sm: 120 },
        minHeight: "100vh",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box sx={{ padding: 1, marginBottom: 2 }}>
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      <List sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component="a"
              href={item.path}
              onClick={() => setSelected(item.path)}
              sx={{
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0.75rem 0.5rem",
                borderRadius: 1,
                transition: "all 0.2s ease-in-out",
                bgcolor:
                  selected === item.path ? "action.hover" : "transparent",
                color: selected === item.path ? "#926B6B" : "text.secondary",
                "&:hover": {
                  bgcolor: "action.hover",
                  color: "#926B6B",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  color: selected === item.path ? "#926B6B" : "text.secondary",
                  "&:hover": { color: "#926B6B" },
                  marginBottom: 0.5,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  whiteSpace: "normal",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <Box
        sx={{
          marginTop: "auto",
          paddingTop: 2,
          display: "flex",
          alignItems: "center",
          marginLeft: 2.9,
        }}
      >
        <Avatar sx={{ bgcolor: "grey.300", marginRight: 1.5,cursor: "pointer" }}>
          <User size={20} />
        </Avatar>
      </Box>
    </Box>
  );
};

export default Sidebar;
