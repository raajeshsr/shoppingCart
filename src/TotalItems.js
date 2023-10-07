import React from "react";

export default function TotalItems({ totalItems, totalPrice }) {
  return (
    <>
      <div className="col-12">total items {totalItems}</div>
      <div className="col-12">total price {totalPrice}</div>
    </>
  );
}
