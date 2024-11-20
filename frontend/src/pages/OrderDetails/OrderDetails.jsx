import React from 'react'
import SideBar from '../../components/SideBar/SideBar';
import TopBar from './TopBar';
import Box from '@mui/material/Box/Box';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Print from '@mui/icons-material/Print';
import { Bold, Download } from 'lucide-react';
import OrderStepper from './OrderStepper';
import { Link as RouterLink } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import './OrderDetails.css';


const OrderDetails = () => {
  const steps = ['Created', 'Dispatched', 'In Transit', 'Delivered'];
  const activeStep = 1;
  const orderSummary = {
    customerInfo: {
      name: 'John Doe',
      phone: '8989898989',
      email: 'John@example.com'
    },
    items: [
      { name: 'Dolo', quantity: 2, price: 94.8 },
      { name: 'Dolo', quantity: 2, price: 94.8 }
    ],
    subtotal: 94.8,
    taxes: 3.65,
    delivery: 4.5,
    total: 102.95
  };

  return (
    <div>
      <SideBar />
      <Box
        p={15}
        sx={{
          bgcolor: "#f5f5f5",
          width: "100%",
          paddingTop: "64px",
          height: "90%",
        }}
      >
        <TopBar />
        <Paper sx={{ p: 4, ml: 8, width: 1150 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body" color="textPrimary" fontWeight={900}>
              Dispatch
            </Typography>
            <Typography variant="body2" color="textSecondary">
              #ORD-2024-004
            </Typography>
          </Box>
          <OrderStepper />
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Grid sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundImage:
                      "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))",
                    color: "white",
                    p: 2,
                    ml: -3,
                    mr: -4,
                    paddingLeft: 3,
                    fontWeight: "bold",
                    padding: 4,
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8,
                  }}
                >
                  Order Summary
                </Typography>

                <Box mb={4}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mt: 3 }}
                    gutterBottom
                  >
                    Customer Information
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9C8684",
                      fontWeight: "300",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#9C8684",
                      },
                    }}
                    component={RouterLink}
                    to="/profile"
                  >
                    {orderSummary.customerInfo.name}
                  </Typography>
                  <Typography>{orderSummary.customerInfo.phone}</Typography>
                  <Typography>{orderSummary.customerInfo.email}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: 15 }}
                  gutterBottom
                >
                  Items
                </Typography>

                {orderSummary.items.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >
                    <Typography>{`${item.quantity}x ${item.name}`}</Typography>
                    <Typography>₹{item.price}</Typography>
                  </Box>
                ))}

                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>SubTotal</Typography>
                    <Typography>₹{orderSummary.subtotal}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Taxes</Typography>
                    <Typography>₹{orderSummary.taxes}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Delivery</Typography>
                    <Typography>₹{orderSummary.delivery}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="h6">Total</Typography>
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: 25 }}
                      variant="h6"
                    >
                      ₹{orderSummary.total}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12} md={5}>
              <Grid
                sx={{
                  pl: 4,
                  mt: -22,
                  border: "1px solid #0f0d0d",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 18 }}
                  variant="h6"
                  gutterBottom
                >
                  Delivery Details
                </Typography>
                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Shipping Address
                  </Typography>
                  <Typography>123, Lorem Ipsum, Dolor Sit, Amet</Typography>
                </Box>
                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Agent Details
                  </Typography>
                  <Typography>Agent id: #11234</Typography>
                  <Typography>Phone no: #11234</Typography>
                </Box>

                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Order Confirmation title
                  </Typography>
                  <Typography>2024-11-20</Typography>
                  <Typography>12pm</Typography>
                </Box>

                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Delivery Date and time
                  </Typography>
                  <Typography>2024-11-21</Typography>
                  <Typography>10 am - 12 am</Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: 15,
                      display: "flex", // Use flex to align text and icon
                      alignItems: "center", // Align items vertically
                    }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Important Notes
                    <span>
                      <ModeEditIcon sx={{ marginLeft: "8px" }} />{" "}
                      {/* Optional: adds space between text and icon */}
                    </span>
                  </Typography>

                  <Typography>
                    Store all Medications in Cool and Dry Place
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} mt={2}>
                  <IconButton>
                    <Print />
                  </IconButton>
                  <IconButton>
                    <Download />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default OrderDetails