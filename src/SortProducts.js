import React from "react";

export default function SortProducts({ updateProductList, products }) {
  function handleSortOptionChange(e) {
    let sortType = e.target.value;
    let sortedProducts = [...products];

    if (sortType === "price-asc") {
      sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
      console.log(sortedProducts);
      updateProductList(sortedProducts);
    }
    if (sortType === "price-desc") {
      sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
      updateProductList(sortedProducts);
      console.log(sortedProducts);
    }
  }

  return (
    <div style={{ position: "relative", left: "88%" }}>
      <b>sort :</b>
      <select onChange={handleSortOptionChange}>
        <option value="" selected>
          select
        </option>
        <option value="price-asc"> Price low to high</option>
        <option value="price-desc">Price hight to low</option>
      </select>
    </div>
  );
}
