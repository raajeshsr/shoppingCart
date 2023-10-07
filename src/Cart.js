import React, { useState, useEffect } from "react";
import SelectedProductList from "./SelectedProductList.js";
import TotalItems from "./TotalItems.js";
// import ProductList from "./ProductList.js";

export default function Cart({
  selectedProducts,
  handleDeleteProductInCart,
  handleDecrementQuantityInCart,
  handleIncrementQuantityInCart,
}) {
  // let temp = [...selectedProducts];
  // const [selectedProducts, setSelectedProducts] = useState(products);

  // { name: "pendrive", quantity: 1, price: 500 },
  // { name: "diaper", quantity: 4, price: 50 },
  // { name: "hardisk", quantity: 1, price: 800 },

  // function handleDeleteProduct(id) {
  //   let updatedProducts = selectedProducts.filter((selectedProduct, index) => {
  //     if (index !== id) return selectedProduct;
  //   });

  //   setSelectedProducts(updatedProducts);
  // }

  // function handleIncrementQuantity(id) {
  //   let updatedProducts = selectedProducts.map((selectedProduct, index) => {
  //     if (index === id) {
  //       return { ...selectedProduct, quantity: selectedProduct.quantity + 1 };
  //     } else {
  //       return selectedProduct;
  //     }
  //   });
  //   console.log(updatedProducts);
  // setSelectedProducts(updatedProducts);
  // }

  // function handleDecrementQuantity(id) {
  //   // alert("hello world");

  //   let updatedProducts = selectedProducts.map((selectedProduct, index) => {
  //     if (index === id) {
  //       if (selectedProduct.quantity > 0) {
  //         return { ...selectedProduct, quantity: selectedProduct.quantity - 1 };
  //       } else {
  //         return selectedProduct;
  //       }
  //     } else {
  //       return selectedProduct;
  //     }
  //   });
  //   console.log(updatedProducts);
  //   setSelectedProducts(updatedProducts);
  //   //   setSelectedProducts( selectedProducts.map())
  // }

  console.log("before totala items");
  console.log(selectedProducts);
  let totalItems = selectedProducts.filter(
    (selectedProduct) => selectedProduct.quantity > 0
  ).length;
  let totalPrice = selectedProducts.reduce(
    (totalPrice, selectedProduct) =>
      totalPrice + selectedProduct.quantity * selectedProduct.price,
    0
  );
  // console.log(totalPrice);
  return (
    <div style={{ border: "3px solid rgba(0, 0, 0, 0.1)" }}>
      {/* CART : {prod.length} */}
      <b>Cart</b>
      <SelectedProductList
        selectedProducts={selectedProducts}
        handleIncrementQuantityInCart={handleIncrementQuantityInCart}
        handleDeleteProductInCart={handleDeleteProductInCart}
        handleDecrementQuantityInCart={handleDecrementQuantityInCart}
      />
      {/* {products.map((prod) => {
        return <p>{prod.title}</p>;
      })} */}

      <div className="row">
        <TotalItems totalItems={totalItems} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
