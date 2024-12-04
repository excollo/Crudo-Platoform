import { Box,Avatar,TableBody,TableRow,TableCell } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import OrderTable from '../CustomerOrders/OrderTable/OrderTable'
import Pagination from '../CustomerOrders/Pagination/Pagination'
import TopBar from './TopBar/TopBar'
import FilterButton from './FilterButton/FilterButton'
import DateFilterButton from './DateFilterButton/DateFilterButton'
import { User } from 'lucide-react'
import React,{useState,useEffect} from 'react'

const CustomerOrder = () => {

    const [orders,setOrders] = useState([])
    const [page,setPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1);

    useEffect(() => {
        fetchCustomerOrders(page);
    },[page])

    const fetchCustomerOrders = async (pageNumber) => {
        try{
            const response = await fetch(
              `http://localhost:3000/api/customerorders/10000166/orders?page=${pageNumber}`
            );
            const data = await response.json();
            setOrders(data.orders);
            setTotalPages(Math.ceil(data.totalOrders / 10));
        }
        catch(error){
            console.log(error);
        }
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }

  return (
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
      <Box p={8} mt={-9}>
        <Paper sx={{ display: "flex", borderLeft: "4px solid #A0616A" }}>
          <Box
            sx={{
              marginTop: "auto",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Avatar
              sx={{ bgcolor: "grey.300", marginRight: 1.5, cursor: "pointer" }}
            >
              <User size={20} />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "-10px",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>
              <b>John Doe</b>
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>10000166</Typography>
            <Typography sx={{ fontSize: "13px" }}>#12453</Typography>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              marginLeft: "650px",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>
              <b>Total Orders</b>
              <br />
              <Typography sx={{ marginLeft: "35px", fontSize: "13px" }}>
                {orders.length}
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              marginBottom: "10px",
              marginLeft: "80px",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>
              <b>Total Spent</b>
              <br />
              <Typography sx={{ marginLeft: "25px", fontSize: "13px" }}>
                $500
              </Typography>
            </Typography>
          </Box>
        </Paper>
        <Paper
          sx={{
            bgcolor: "white",
            p: "20px",
            width: "100%",
            marginTop: "20px",
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
              width: "76%",
              padding: "10px 15px",
              fontSize: "16px",
              border: "1px solid #E0E0E0",
              borderRadius: "20px",
            }}
          />
          <FilterButton />
          <DateFilterButton />
        </Paper>
        <Paper sx={{marginTop: "2rem", paddingBottom: "2rem"}}>
          <OrderTable orders={orders} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default CustomerOrder