import React, { useState } from "react";
import CustomerDetails from "../../components/CustomerDetails/CustomerDetails";
import ProductSearch from "../../components/ProductSearch/ProductSearch";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import NavBar from "../../components/NavBar/NavBar";
import './OrderForm.css';

const OrderForm = () => {
  const [customer, setCustomer] = useState(null); // Holds customer details
  const [productList, setProductList] = useState([]); // Holds list of added products
  const [fullAddress, setFullAddress] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleSelectedProductsChange = (products) => {
    setSelectedProduct(products);
    setProductList(products); // Update productList if needed for OrderSummary
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedProduct((prevProducts) =>
      prevProducts.map((product) =>
        product.value === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const handleAddressChange = (address) => {
    setFullAddress(address);
  };

  // Update customer details when modified in CustomerDetails component
  const handleCustomerUpdate = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };
  

  return (
    <div>
      <NavBar />
      <div className="display">
        <div className="displaying">
          <CustomerDetails
            onAddressUpdate={handleAddressChange}
            onCustomerUpdate={handleCustomerUpdate}
          />
          <OrderSummary customer={customer} productList={selectedProduct} />
        </div>
        <ProductSearch selectedProduct={selectedProduct} onSelectedProductsChange={handleSelectedProductsChange} />
        <ProductQuantity selectedProduct={selectedProduct} onQuantityChange={handleQuantityChange} />
      </div>
    </div>
  );
};

export default OrderForm;
