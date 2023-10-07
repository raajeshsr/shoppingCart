import React from "react";
import SelectedProduct from "./SelectedProduct.js";

export default function SelectedProductList({
  selectedProducts,
  handleDecrementQuantityInCart,
  handleIncrementQuantityInCart,
  handleDeleteProductInCart,
}) {
  console.log(`selected list ${selectedProducts.length}`);
  return (
    <div>
      {selectedProducts.map((selectedProduct, index) => {
        return (
          <div className="row">
            <SelectedProduct
              index={index}
              selectedProduct={selectedProduct}
              handleDecrementQuantityInCart={handleDecrementQuantityInCart}
              handleIncrementQuantityInCart={handleIncrementQuantityInCart}
              handleDeleteProductInCart={handleDeleteProductInCart}
            />
          </div>
        );
      })}
    </div>
  );
}
