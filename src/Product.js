import React from "react";

export default function Product({ product, handleAddToCart }) {
  // console.log(product);
  function handleClickAddToCart() {
    handleAddToCart(product);
  }
  return (
    <>
      <p>
        <b>{product.title}</b>
      </p>

      <img src={product.images[0]} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="mark">PRICE : ₹ {product.price}</p>
        <a className="btn btn-primary" onClick={handleClickAddToCart}>
          Add to Cart
        </a>
      </div>
    </>
  );
}
