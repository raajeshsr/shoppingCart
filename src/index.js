import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import Cart from "./Cart.js";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <GoogleOAuthProvider clientId="1019610921314-vi4g032v48krlq4lca04do3li67q7sk8.apps.googleusercontent.com">
//     <React.StrictMode>
//       {/* <App /> */}
//       {/* <Layout /> */}
//     </React.StrictMode>
//   </GoogleOAuthProvider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <GoogleOAuthProvider clientId="1019610921314-vi4g032v48krlq4lca04do3li67q7sk8.apps.googleusercontent.com">
          <React.StrictMode>
            <App />
            {/* <Layout /> */}
          </React.StrictMode>
        </GoogleOAuthProvider>
      </div>
    ),
  },
  {
    path: "cart",
    element: <Cart />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
