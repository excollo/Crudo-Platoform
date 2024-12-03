import React from "react";
import "./ProductQuantity.css";

const ProductQuantity = ({ selectedProduct, onQuantityChange }) => {
  const handleQuantityChange = (product, newQuantity) => {
    if (newQuantity >= 1) {
      // Only ensure the minimum is 1
      onQuantityChange(product.value, newQuantity);
    }
  };

  return (
    <div className="product-details-container">
      <div className="card">
        <h2 className="section-header">Product Quantity</h2>
        <div>
          {selectedProduct && selectedProduct.length > 0 ? (
            selectedProduct.map((product) => (
              <div key={product.value}>
                <div>
                  <div className="display-1">
                    {/* Product Details */}
                    <div className="product-details">
                      <div>
                        <h3>{product.label}</h3>
                      </div>
                      {/* Quantity Controls */}
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            handleQuantityChange(product, product.quantity - 1)
                          }
                          disabled={product.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              product,
                              parseInt(e.target.value) || 1
                            )
                          }
                          min="1"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(product, product.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* MRP */}
                    <div>
                      <p>₹{product.MRP}</p>
                    </div>
                  </div>
                  {/* Stock Info */}
                  <p className="stock">Stock Available: {product.Stock}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No products selected</p>
          )}
        </div>
        {/* Total MRP */}
        {selectedProduct && selectedProduct.length > 0 && (
          <div className="total-section">
            <h3>
              Total MRP: ₹
              {selectedProduct
                .reduce(
                  (sum, product) => sum + product.MRP * product.quantity,
                  0
                )
                .toFixed(2)}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductQuantity;
