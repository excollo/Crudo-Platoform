import React from "react"; // Importing React to create the component
import SideBar from "../../components/SideBar/SideBar"; // Importing the Sidebar component
import TopBar from "./TopBar"; // Importing the TopBar component
import Box from "@mui/material/Box/Box"; // Importing Box component from Material UI
import { Paper } from "@mui/material"; // Importing Paper component from Material UI
import Typography from "@mui/material/Typography"; // Importing Typography component for text styling
import Grid from "@mui/material/Grid"; // Importing Grid for layout purposes
import Divider from "@mui/material/Divider"; // Importing Divider to separate sections
import Stack from "@mui/material/Stack"; // Importing Stack for spacing icons horizontally
import IconButton from "@mui/material/IconButton"; // Importing IconButton for clickable icons
import Print from "@mui/icons-material/Print"; // Importing Print icon
import { Download } from "lucide-react"; // Importing Download icon from lucide-react
import OrderStepper from "./OrderStepper"; // Importing OrderStepper to show steps in the order process
import { Link as RouterLink } from "react-router-dom"; // Importing RouterLink for navigation within the app
import ModeEditIcon from "@mui/icons-material/ModeEdit"; // Importing Edit icon
import "./OrderDetails.css"; // Importing custom CSS file for styling

const OrderDetails = () => {
  // Defining a sample orderSummary object that will hold order details
  const orderSummary = {
    customerInfo: {
      name: "John Doe",
      phone: "8989898989",
      email: "John@example.com",
    },
    items: [
      { name: "Dolo", quantity: 2, price: 94.8 },
      { name: "Dolo", quantity: 2, price: 94.8 },
    ],
    subtotal: 94.8,
    taxes: 3.65,
    delivery: 4.5,
    total: 102.95,
  };

  return (
    <div>
      <SideBar /> {/* Rendering the sidebar */}
      <Box
        p={15} // Applying padding of 15 to the Box component
        sx={{
          bgcolor: "#f5f5f5", // Setting background color
          width: "100%", // Ensuring the Box takes full width
          paddingTop: "64px", // Adding top padding to prevent overlap with fixed navbar
          height: "90%", // Setting height to 90%
        }}
      >
        <TopBar /> {/* Rendering the TopBar */}
        <Paper sx={{ p: 4, ml: 8, width: 1150 }}>
          {" "}
          {/* Paper component for content wrapper */}
          <Box sx={{ mb: 3 }}>
            {" "}
            {/* Box with margin-bottom */}
            <Typography variant="body" color="textPrimary" fontWeight={900}>
              Dispatch {/* Title for the section */}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              #ORD-2024-004 {/* Order ID */}
            </Typography>
          </Box>
          <OrderStepper /> {/* Stepper component for order stages */}
          <Grid container spacing={3}>
            {" "}
            {/* Grid for responsive layout */}
            <Grid item xs={12} md={7}>
              {" "}
              {/* Grid for the first section (Order Summary) */}
              <Grid sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundImage:
                      "var(--linear, linear-gradient(99deg, #FFB8B8 2.64%, #A0616A 100%))", // Gradient background
                    color: "white", // Text color white
                    p: 2, // Padding for the title
                    ml: -3, // Left margin for positioning
                    mr: -4, // Right margin for positioning
                    fontWeight: "bold", // Bold text
                    padding: 4, // Additional padding for spacing
                    borderTopRightRadius: 8, // Border radius for top-right corner
                    borderTopLeftRadius: 8, // Border radius for top-left corner
                  }}
                >
                  Order Summary {/* Section title */}
                </Typography>
                <Box mb={4}>
                  {" "}
                  {/* Box for customer information section */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mt: 3 }} // Bold and top margin
                    gutterBottom
                  >
                    Customer Information {/* Section title */}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9C8684", // Custom text color
                      fontWeight: "300", // Light font weight
                      textDecoration: "none", // No underline
                      "&:hover": {
                        textDecoration: "underline", // Underline on hover
                        color: "#9C8684", // Maintain color on hover
                      },
                    }}
                    component={RouterLink} // Making the customer name a clickable link
                    to="/profile" // Link to profile page
                  >
                    {orderSummary.customerInfo.name} {/* Customer name */}
                  </Typography>
                  <Typography>{orderSummary.customerInfo.phone}</Typography>{" "}
                  {/* Customer phone */}
                  <Typography>
                    {orderSummary.customerInfo.email}
                  </Typography>{" "}
                  {/* Customer email */}
                </Box>
                <Divider sx={{ my: 2 }} /> {/* Divider to separate sections */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: 15 }} // Bold and custom font size
                  gutterBottom
                >
                  Items {/* Section title for ordered items */}
                </Typography>
                {/* Rendering items in the order */}
                {orderSummary.items.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between" // Items and prices on opposite sides
                    mb={1} // Margin-bottom between items
                  >
                    <Typography>{`${item.quantity}x ${item.name}`}</Typography>{" "}
                    {/* Item quantity and name */}
                    <Typography>₹{item.price}</Typography> {/* Item price */}
                  </Box>
                ))}
                <Box>
                  {/* Displaying subtotal, taxes, and delivery details */}
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
                  <Divider sx={{ my: 2 }} />{" "}
                  {/* Divider between price details */}
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="h6">Total</Typography>
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: 25 }} // Bold and large font size for total
                      variant="h6"
                    >
                      ₹{orderSummary.total} {/* Total price */}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              {" "}
              {/* Grid for delivery details */}
              <Grid
                sx={{
                  pl: 4, // Padding-left
                  mt: -22, // Margin-top adjustment
                  border: "1px solid #0f0d0d", // Border around the delivery section
                  borderRadius: 2, // Border radius
                  p: 1, // Padding inside the box
                }}
              >
                <Typography
                  sx={{ fontWeight: "bold", fontSize: 18 }} // Bold and larger font size for title
                  variant="h6"
                  gutterBottom
                >
                  Delivery Details {/* Section title */}
                </Typography>
                {/* Shipping Address, Agent Details, Confirmation, and Delivery Date */}
                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Shipping Address
                  </Typography>
                  <Typography>123, Lorem Ipsum, Dolor Sit, Amet</Typography>{" "}
                  {/* Example address */}
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
                  <Typography>2024-11-20</Typography> {/* Confirmation date */}
                  <Typography>12pm</Typography> {/* Confirmation time */}
                </Box>

                <Box mb={3}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Delivery Date and time
                  </Typography>
                  <Typography>2024-11-21</Typography> {/* Delivery date */}
                  <Typography>10 am - 12 am</Typography>{" "}
                  {/* Delivery time window */}
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "#A0616A", // Custom color for action items
                      fontFamily: "Helvetica, sans-serif", // Custom font family
                    }}
                  >
                    Print {/* Title */}
                  </Typography>
                  <Box>
                    <Stack direction="row" spacing={2}>
                      {" "}
                      {/* Stack for horizontal icons */}
                      <IconButton aria-label="print">
                        <Print />
                      </IconButton>
                      <IconButton aria-label="download">
                        <Download />
                      </IconButton>
                      <IconButton aria-label="edit">
                        <ModeEditIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default OrderDetails; // Exporting the component for use in other parts of the app
