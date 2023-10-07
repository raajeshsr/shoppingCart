import React, { useState } from "react";
import ProductList from "./ProductList.js";

export default function Pagination({ products, limit = 10, handleAddToCart }) {
  const [currentPage, setCurrentPage] = useState(1);
  let totalProducts = products.length;
  let pages = [];
  let lastPage = totalProducts / limit;

  if (totalProducts > limit && lastPage > Math.floor(totalProducts / limit)) {
    lastPage++;
  }
  let from = (currentPage - 1) * limit;
  let to = (currentPage - 1) * limit + 1 + (limit - 1);
  let giveMe = products.slice(from, to);

  for (let i = 1; i <= lastPage; i++) {
    pages.push(i);
  }

  function handleClickNextPage() {
    if (currentPage >= lastPage) return;
    setCurrentPage(currentPage + 1);
  }
  function handleClickPrevPage() {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  }

  function handleClickPage(e) {
    let page = parseInt(e.target.value);
    setCurrentPage(page);
  }

  return (
    <>
      {/* current page no {currentPage} */}

      {/* Pagination */}

      <div className="row">
        {currentPage > 1 && (
          <button
            className="col-auto btn  btn-secondary"
            type=""
            onClick={handleClickPrevPage}
          >
            prev
          </button>
        )}
        {pages.map((page) => (
          <button
            // className="col-auto btn"
            // style={page === currentPage ? { fontSize: "10px" } : ""}
            className={
              page === currentPage ? "col-auto btn btn-primary" : "col-auto btn"
            }
            style={{ width: "30px" }}
            type=""
            value={page}
            onClick={handleClickPage}
          >
            {page}
          </button>
        ))}
        {currentPage !== lastPage && pages.length > 1 && (
          <button
            className="col-auto btn  btn-secondary"
            type=""
            onClick={handleClickNextPage}
          >
            next
          </button>
        )}
      </div>
      <br />
      {/* give me products {from} to {to} */}
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-8">
        <ProductList products={giveMe} handleAddToCart={handleAddToCart} />
      </div>
    </>
  );
}
