import React, { useState, useEffect } from "react";

export default function Payment({ products }) {
  console.log("in payment");

  let items = products.map((product) => {
    return {
      title: product.title,
      price: product.price,
      quantity: product.quantity,
    };
  });

  console.log(products);
  let handleCheckout = async () => {
    let options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(products),
    };

    const res = await fetch(
      "http://localhost:4242/create-checkout-session",
      options
    );

    const body = await res.json();

    console.log(body.url);
    window.location.href = body.url;
  };

  return (
    <button
      className="btn btn-primary"
      disabled={products.length > 0 ? false : true}
      onClick={handleCheckout}
      type="submit"
    >
      Checkout
    </button>
  );
}
