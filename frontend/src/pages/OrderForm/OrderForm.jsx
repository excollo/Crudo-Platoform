import React, { useState } from "react";
import CustomerDetails from "../../components/CustomerDetails/CustomerDetails";
import ProductSearch from "../../components/ProductSearch/ProductSearch";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import NavBar from "../../components/NavBar/NavBar";
import Button from "@mui/material/Button";
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
    const updatedProducts = selectedProduct.map((product) =>
      product.value === productId
        ? { ...product, quantity: newQuantity }
        : product
    );

    setSelectedProduct(updatedProducts); // selectedProduct update karna zaroori hai

    // Update productList
    setProductList(updatedProducts); // productList ko bhi sync mein rakho
  };

  const handleAddressChange = (address) => {
    setFullAddress(address);
  };

  // Update customer details when modified in CustomerDetails component
  const handleCustomerUpdate = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  const handleSubmitOrder = async () => {

    const orderData = {
      customer: {
        name: customer.Party,
        address: customer.Address,
        phone: customer.Mobile,
        email: customer.Email,
        age: customer.parsedAge,
        sex: customer.Sex,
      },
      products: productList.map((product) => ({
        productId: product.value,
        name: product.label,
        quantity: product.quantity,
        price: product.MRP,
      })),
      totalMRP: productList.reduce(
        (sum, product) => sum + product.MRP * product.quantity,
        0
      ),
    };
  console.log(orderData);
  try {
      const response = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Order saved successfully');
      } else {
        alert('Failed to save order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order');
  }
}

  

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
        <ProductSearch
          selectedProduct={selectedProduct}
          onSelectedProductsChange={handleSelectedProductsChange}
        />
        <ProductQuantity
          selectedProduct={selectedProduct}
          onQuantityChange={handleQuantityChange}
        />
        <Button variant="contained" onClick={handleSubmitOrder} disableElevation>
          Submit Order
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
