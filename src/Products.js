import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((products) => {
        setProducts(products.products);
        setFilteredProducts(products.products);
      });
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategories]);

  function filterProducts() {
    if (selectedCategories.length < 1) {
      setFilteredProducts(products);
      return;
    }

    let temp = selectedCategories.map((category) => {
      return products.filter((product) => product.category === category);
    });
    console.log(temp);
    console.log("flat");
    console.log(temp.flat());

    setFilteredProducts(temp.flat());
  }

  let productsEl = products.map((product) => <li>{product.title}</li>);

  let filteredProductEl = filteredProducts.map((product) => (
    <li>{product.title}</li>
  ));

  let category = products.map((product) => {
    return product.category;
  });

  let uniqueCategory = [...new Set(category)];
  //   console.log([...uniqueCategory]);

  let categoryEl = uniqueCategory.map((category) => {
    return (
      <div>
        <input
          type="checkbox"
          name=""
          value={category}
          onClick={handleSelectCategory}
        />{" "}
        {category}
      </div>
    );
  });

  function handleSelectCategory(e) {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, e.target.value]);
    } else {
      let filteredCategory = selectedCategories.filter((category) => {
        return category !== e.target.value;
      });
      console.log(filteredCategory);

      setSelectedCategories([...filteredCategory]);
    }
  }

  return (
    <>
      {categoryEl}

      {filteredProductEl}
    </>
  );
}
