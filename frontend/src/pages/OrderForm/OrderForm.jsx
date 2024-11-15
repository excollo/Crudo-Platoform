import React, { useState } from "react";
import CustomerDetails from "../../components/CustomerDetails/CustomerDetails";
import ProductDetails from "../../components/ProductDetails";
import OrderSummary from "../../components/OrderSummary";
import NavBar from "../../components/NavBar/NavBar";

const OrderForm = () => {
  const [customer, setCustomer] = useState(null); // Holds customer details
  const [productList, setProductList] = useState([]); // Holds list of added products

  // Update customer details when modified in CustomerDetails component
  const handleCustomerUpdate = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  // Update product list when modified in ProductDetails component
  const handleProductListUpdate = (updatedProductList) => {
    setProductList(updatedProductList);
  };

  return (
    <div>
      <NavBar />
      <CustomerDetails onCustomerUpdate={handleCustomerUpdate} />
      <ProductDetails onProductListUpdate={handleProductListUpdate} />
      <OrderSummary customer={customer} productList={productList} />
    </div>
  );
};

export default OrderForm;
