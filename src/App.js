import logo from "./logo.svg";
import "./App.css";
// import TodoListSystem from "./TodoListSystem";
// import Vision from "./Vision";

import { useState, useEffect } from "react";
// import Practise from "./Practise";
import Cart from "./Cart.js";
// import Products from "./Products.js";
import jwt_decode from "jwt-decode";
import MultipleCategoryFilter from "./MultipleCategoryFilter";
import ProductList from "./ProductList.js";
// import { products as allProducts } from "./ProductData.js";
import SortProducts from "./SortProducts";
import Pagination from "./Pagination.js";
// import Test from "./Test.js";
// import Counter from "./Counter";
import * as React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
// import getStripe from "./lib/getStripe";
// import env from "react-dotenv";
import Payment from "./Payment";

// import { useGoogleLogin } from "@react-oauth/google";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

// import { Pagination } from "@mui/material";

const todos = ["todo1", "todo2", "todo3"];

function App() {
  // const [counter, setCounter] = useState(0);
  const [mode, setMode] = useState("day");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({});
  // const [backgroundStyle, setbackgroundStyle] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [productList, setProductList] = useState([]);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (user.email) {
      let data = JSON.parse(localStorage.getItem(user.email));
      if (data) setCartProducts(data.cartProducts);
    } else setCartProducts([]);
  }, [user]);
  useEffect(() => {
    console.log(cartProducts);
    let email = user.email;
    if (email)
      localStorage.setItem(
        email,
        JSON.stringify({ cartProducts: cartProducts })
      );
    else console.log("user not logged in");
  }, [cartProducts]);

  function handleAddToCart(product) {
    //if prod exist in cartProducts array
    // increment quantity by 1
    // else
    // initialise quantity to 1
    // add prod to cartProducts array
    let productExistInCart = false;
    // let productId;
    let index;

    function checkProductExistInCart() {
      cartProducts.forEach((productInCart, i) => {
        if (productInCart.id === product.id) {
          productExistInCart = true;
          // productId = product.id;
          index = i;
          return;
        }
      });
    }

    checkProductExistInCart();
    if (productExistInCart) {
      handleIncrementQuantityInCart(index);
    } else {
      let productToAddInCart = { ...product, quantity: 1 };

      setCartProducts((current) => [...current, productToAddInCart]);
    }
  }
  function handleIncrementQuantityInCart(id) {
    let updatedProducts = cartProducts.map((selectedProduct, index) => {
      if (index === id) {
        return { ...selectedProduct, quantity: selectedProduct.quantity + 1 };
      } else {
        return selectedProduct;
      }
    });
    console.log(updatedProducts);
    setCartProducts(updatedProducts);
  }

  function handleDeleteProductInCart(id) {
    let updatedProducts = cartProducts.filter((selectedProduct, index) => {
      if (index !== id) return selectedProduct;
    });
    setCartProducts(updatedProducts);
  }

  function handleDecrementQuantityInCart(id) {
    // alert("hello world");
    let removeProduct = false;
    let i;

    let updatedProducts = cartProducts.map((selectedProduct, index) => {
      if (index === id) {
        if (selectedProduct.quantity > 1) {
          return { ...selectedProduct, quantity: selectedProduct.quantity - 1 };
        } else {
          i = index;
          removeProduct = true;
          return selectedProduct;
          // delete the product
          //  cartProducts.filter((selectedProduct, index) => {
          //   if (index !== id) return selectedProduct;
          // });
        }
      } else {
        return selectedProduct;
      }
    });
    // console.log(updatedProducts);
    if (removeProduct) handleDeleteProductInCart(i);
    else setCartProducts(updatedProducts);
    //   setSelectedProducts( selectedProducts.map())
  }

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setAllProducts(res.products);
        setProductList(res.products);

        console.log(res.products);
      });
  }, []);

  useEffect(() => {
    console.log("added to card products changed");
    console.log(cartProducts);
  }, [cartProducts]);
  function logout() {
    googleLogout();
    setUser({});
    setIsLoggedIn(false);
  }

  function updateProductList(products) {
    console.log("update called");
    setProductList(products);
  }

  function handleToggleVisionMode() {
    if (mode === "day") {
      setMode("night");
    } else {
      setMode("day");
    }
  }

  return (
    <div
      style={
        mode === "day"
          ? { backgroundColor: "white", color: "black" }
          : { backgroundColor: "black", color: "white" }
      }
    >
      <div style={{ width: "100%", position: "relative", left: "85%" }}>
        {isLoggedIn ? (
          <div>
            welcome {user.name} <br />
            <img style={{ borderRadius: "50%" }} src={user.image} alt="" />
            {/* <button onClick={() => login()}>Sign in with Google 🚀 </button>; */}
            <button type="" onClick={logout}>
              logout
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              let decoded = jwt_decode(credentialResponse.credential);
              console.log("decoded");
              console.log(decoded);
              setUser({
                ...user,
                name: decoded.name,
                email: decoded.email,
                image: decoded.picture,
              });
              setIsLoggedIn(true);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>

      {/* <Pagination products={allProducts} limit={4} /> */}

      <SortProducts
        updateProductList={updateProductList}
        products={productList}
      />

      <div className="row ">
        <div className="col-4">
          <MultipleCategoryFilter
            updateProductList={updateProductList}
            products={allProducts}
          />
        </div>

        {/* <Products /> */}
        {/* total products {productList.length} */}
        <div className="col-8">
          <Pagination
            products={productList}
            limit={6}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* <Counter
        counter={counter}
        handleIncrement={handleIncrement}
        // handleDecrement={handleDecrement}
      /> */}
      {/* <Test products={myProducts} /> */}
      <Cart
        key={cartProducts}
        selectedProducts={cartProducts}
        handleDeleteProductInCart={handleDeleteProductInCart}
        handleDecrementQuantityInCart={handleDecrementQuantityInCart}
        handleIncrementQuantityInCart={handleIncrementQuantityInCart}
      />
      {/* {cartProducts.length > 0 && <Payment products={cartProducts} />} */}
      <Payment products={cartProducts} />

      {/* <Vision mode={mode} handleToggleVisionMode={handleToggleVisionMode} /> */}
      {/* <Cart /> */}
    </div>
  );
}

export default App;
