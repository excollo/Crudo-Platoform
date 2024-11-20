import { useState } from "react";
import OrderForm from "./pages/OrderForm/OrderForm";
import SignInPage from "./pages/Signin/SignInPage";
import SignUpPage from "./pages/Signup/SignUpPage";
import NavBar from "./components/SideBar/SideBar";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const AppContent = ({ customer, setCustomer, productList, setProductList }) => {
  const location = useLocation();
  const shouldShowNavbar = !["/signin", "/signup"].includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <NavBar />}
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/create-order"
          element={
            <ProtectedRoute>
              <OrderForm
                customer={customer}
                setCustomer={setCustomer}
                productList={productList}
                setProductList={setProductList}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/order-details" element={<OrderDetails />} />
      </Routes>
    </div>
  );
};

function App() {
  const [customer, setCustomer] = useState(null); // Customer state
  const [productList, setProductList] = useState([]); // Product list state

  return (
    <Router
      futureFlags={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppContent
        customer={customer}
        setCustomer={setCustomer}
        productList={productList}
        setProductList={setProductList}
      />
    </Router>
  );
}

export default App;
