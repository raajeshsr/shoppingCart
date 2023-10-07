import React, { useState, useEffect } from "react";

export default function MultipleCategoryFilter({
  updateProductList,
  products,
}) {
  // const [filteredList, setFilteredList] = useState([...products]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  function getUniqueCategory() {
    let allCategories = products.map((product) => {
      return product.category;
    });

    return [...new Set(allCategories)];
  }
  let uniqueCategories = getUniqueCategory();

  function getUniqueBrands() {
    let allBrands = products.map((product) => {
      return product.brand;
    });

    return [...new Set(allBrands)];
  }
  let uniqueBrands = getUniqueBrands();

  function removeFilter(filter, value) {
    let copy = [...selectedFilters];
    copy.forEach((obj, index) => {
      if (filter in obj) {
        let newtemp = obj[filter].filter((option) => {
          return option !== value;
        });

        if (newtemp.length < 1) copy.splice(index, 1);
        else obj[filter] = newtemp;

        return;
      }
    });
    console.log(copy);
    setSelectedFilters([...copy]);
  }

  function checkIfFilterExists(filter, value) {
    let copy = [...selectedFilters];

    let isExist = false;

    copy.forEach((obj) => {
      if (filter in obj) {
        isExist = true;
        console.log("exists");

        obj[filter].push(value);

        return;
      }
    });
    if (!isExist) {
      let obj = {};
      obj[filter] = [value];
      copy.push(obj);
      console.log("does not exist");
    }
    console.log(copy);

    setSelectedFilters([...copy]);
  }

  //   console.log(filteredList);
  function handleClickFilter(e) {
    let filter = e.target.name;

    let value = e.target.value;

    let isChecked = e.target.checked;

    if (isChecked) {
      //add
      checkIfFilterExists(filter, value);
    } else {
      //remove
      removeFilter(filter, value);
    }
  }

  // console.log(`selectedFilters `);
  // console.log(selectedFilters);

  useEffect(() => {
    filter();
    console.log("state set");
  }, [selectedFilters]);

  function filter() {
    let tempProdList = [...products];
    console.log(tempProdList);
    selectedFilters.forEach((filter) => {
      let filterType = Object.keys(filter)[0];

      let temp = tempProdList.filter((product) => {
        return filter[filterType].includes(product[filterType]);
      });
      console.log("temp");
      console.log(temp);
      tempProdList = [...temp];
    });
    console.log("final filtered list");
    console.log(tempProdList);

    // setFilteredList(tempProdList);
    updateProductList(tempProdList);
  }

  return (
    <>
      <div className="row ">
        <b>Category</b> <br />
        {uniqueCategories.map((category) => {
          return (
            <div className="col-lg-6 col-12">
              <input
                type="checkbox"
                name="category"
                value={category}
                onClick={handleClickFilter}
              />
              {category}
            </div>
          );
        })}
        <br />
      </div>
      <div className="row">
        <b>Brand</b> <br />
        {uniqueBrands.map((brand) => {
          return (
            <div className="col-lg-6 col-12">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                onClick={handleClickFilter}
              />
              {brand}
            </div>
          );
        })}
      </div>
    </>
  );
}
