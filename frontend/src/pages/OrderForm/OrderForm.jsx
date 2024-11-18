import React, { useState } from "react";
import CustomerDetails from "../../components/CustomerDetails/CustomerDetails";
import ProductSearch from "../../components/ProductSearch/ProductSearch";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import NavBar from "../../components/NavBar/NavBar";
import './OrderForm.css';

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
      <div className="displaying">
        <CustomerDetails onCustomerUpdate={handleCustomerUpdate} />
        <OrderSummary customer={customer} productList={productList} />
      </div>
        <ProductSearch onProductListUpdate={handleProductListUpdate} />
    </div>
  );
};

export default OrderForm;
