import React from 'react'
import { useState } from 'react';
import TopBar from './TopBar'
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import FilterButton from './FilterButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, TableHead, TableRow, TableCell,TableBody } from '@mui/material';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@mui/material';
import DateFilterButton from './DateFilterButton';

const TrackOrder = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleCheckboxChange = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };
  const orders = [
    {
      id: "#1234",
      customerName: "Yash Jain",
      phoneNo: "9933779999",
      orderDate: "24-8-2024",
      orderAmount: 400,
      status: "Created",
    },
    // Add more order objects as needed
  ];
  return (
    <div>
      <Box
        p={15}
        sx={{
          bgcolor: "#f5f5f5", // Background color
          width: "100%",
          paddingTop: "64px", // Padding from the top
          height: "90%", // Set the height of the content
        }}
      >
        <TopBar />
        <Paper
          sx={{
            bgcolor: "white",
            p: "20px",
            width: "96.5%",
            marginLeft: "65px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <input
            type="search"
            placeholder="🔍 Search"
            style={{
              width: "90%",
              padding: "10px 15px",
              fontSize: "16px",
              border: "1px solid #E0E0E0",
              borderRadius: "20px",
            }}
          />
          <FilterButton />
        </Paper>
        <Paper
          sx={{
            bgcolor: "white",
            p: "20px",
            marginTop: "20px",
            width: "96.5%",
            marginLeft: "65px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <Checkbox
                    indeterminate={
                      selectedOrders.length > 0 &&
                      selectedOrders.length < orders.length
                    }
                    checked={
                      orders.length > 0 &&
                      selectedOrders.length === orders.length
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedOrders(orders.map((order) => order.id));
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <strong>Order ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Customer Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Phone No.</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      indeterminate={
                        selectedOrders.length > 0 &&
                        selectedOrders.length < orders.length
                      }
                      checked={
                        orders.length > 0 &&
                        selectedOrders.length === orders.length
                      }
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedOrders(orders.map((order) => order.id));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.phoneNo}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.orderAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </div>
  );
}

export default TrackOrder