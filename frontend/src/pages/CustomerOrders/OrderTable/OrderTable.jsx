import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Checkbox } from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";


const OrderTable = ({orders}) => {
    const [selectedOrders, setSelectedOrders] = useState([]);

    const handleCheckboxChange = (orderId) => {
      if (selectedOrders.includes(orderId)) {
        setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
      } else {
        setSelectedOrders([...selectedOrders, orderId]);
      }
    };
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {" "}
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#A0616A",
                  },
                }}
                indeterminate={
                  selectedOrders.length > 0 &&
                  selectedOrders.length < orders.length
                }
                checked={
                  orders.length > 0 && selectedOrders.length === orders.length
                }
                onChange={(event) => {
                  if (event.target.checked) {
                    setSelectedOrders(orders.map((order) => order._id));
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
              <strong>Order Date</strong>
            </TableCell>
            <TableCell>
              <strong>Phone No.</strong>
            </TableCell>
            <TableCell>
              <strong>Amount</strong>
            </TableCell>
            <TableCell>
              <strong>Order Status</strong>
            </TableCell>
            <TableCell>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Checkbox
                  sx={{
                    "&.Mui-checked": {
                      color: "#A0616A",
                    },
                  }}
                  checked={selectedOrders.includes(order._id)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      // Add this specific order's ID to selected orders
                      setSelectedOrders([...selectedOrders, order._id]);
                    } else {
                      // Remove this specific order's ID from selected orders
                      setSelectedOrders(
                        selectedOrders.filter((id) => id !== order._id)
                      );
                    }
                  }}
                />
              </TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>{order.customer.phone}</TableCell>
              <TableCell>{order.totalMRP}</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>
                <FontAwesomeIcon
                  sx={{ cursor: "pointer" }}
                  icon={faEllipsisVertical}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable