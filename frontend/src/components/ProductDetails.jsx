import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const ProductDetails = ({ onProductListUpdate }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [productSearch, setProductSearch] = useState("");

  // Fetch products data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  // Update selected product from dropdown
  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
  };

  // Add the selected product with quantity to the product list
  const handleAddProduct = () => {
    if (selectedProduct) {
      const newProductList = [
        ...productList,
        { ...selectedProduct, quantity: quantity },
      ];
      setProductList(newProductList);
      onProductListUpdate(newProductList); // Send updated product list to parent component
      setSelectedProduct(null); // Reset selection after adding product
      setQuantity(1); // Reset quantity
    }
  };

  // Remove a product from the list by index
  const handleRemoveProduct = (index) => {
    const updatedProductList = productList.filter((_, i) => i !== index);
    setProductList(updatedProductList);
    onProductListUpdate(updatedProductList); // Update parent component with new list
  };

  // Filter products based on search input
  const filterProducts = () => {
    return products.filter((product) =>
      product.NameToDisplay.toLowerCase().includes(productSearch.toLowerCase())
    );
  };

  // Prepare product options for the Select component
  const productOptions = filterProducts().map((product) => ({
    label: product.NameToDisplay,
    value: product.PKID,
    MRP: product.MRP,
    Stock: product.Stock,
  }));

  return (
    <div className="product-details">
      <h3>Product Details</h3>

      {/* Dropdown for product selection */}
      <div className="product-selection">
        <Select
          options={productOptions}
          value={selectedProduct}
          onChange={handleProductChange}
          placeholder="Select a product"
        />
      </div>

      {/* Show product info and add to list option when a product is selected */}
      {selectedProduct && (
        <div className="product-info">
          <p>
            <strong>Unit Price:</strong> ₹{selectedProduct.MRP}
          </p>
          <p>
            <strong>Stock Availability:</strong> {selectedProduct.Stock} items
          </p>
          <p>
            <strong>Quantity:</strong>
          </p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            placeholder="Quantity"
            required
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      )}

      {/* List of added products */}
      <div className="added-products">
        <h4>Added Products</h4>
        <ul>
          {productList.map((item, index) => (
            <li key={index} className="product-item">
              <span>
                {item.label} - {item.quantity} pcs
              </span>
              <button
                className="remove-product-btn"
                onClick={() => handleRemoveProduct(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
