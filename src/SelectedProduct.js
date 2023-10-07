import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Icon from "@mui/material/Icon";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

export default function SelectedProduct({
  selectedProduct,
  index,
  handleDecrementQuantityInCart,
  handleIncrementQuantityInCart,
  handleDeleteProductInCart,
}) {
  console.log(`selected product${selectedProduct}`);
  return (
    <>
      <div className="col-4" style={{ fontSize: "15px" }}>
        {selectedProduct.title}
      </div>

      <div className="col-4">price: ₹ {selectedProduct.price}</div>
      <button
        className=" border-0 col-auto"
        type=""
        onClick={() => {
          handleIncrementQuantityInCart(index);
        }}
      >
        +
      </button>
      <div className="col-auto text-center">{selectedProduct.quantity}</div>
      <button
        className=" border-0 col-auto"
        type=""
        onClick={() => {
          handleDecrementQuantityInCart(index);
        }}
      >
        -
      </button>

      <button
        style={{ backgroundColor: "white" }}
        className="border-0 col"
        type=""
        onClick={() => {
          handleDeleteProductInCart(index);
        }}
      >
        <DeleteRoundedIcon></DeleteRoundedIcon>
      </button>
    </>
  );
}
