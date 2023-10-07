import React from "react";
import Product from "./Product.js";

export default function ProductList({ products, handleAddToCart }) {
  if (products.length < 1) {
    return <h1>Oops ! No items found </h1>;
  }

  return (
    <>
      {/* total items {products.length} */}
      {products.map((product) => {
        return (
          // <div className="col">
          <div className="col card">
            <Product product={product} handleAddToCart={handleAddToCart} />
          </div>
          // </div>
        );
      })}
    </>
  );
}
