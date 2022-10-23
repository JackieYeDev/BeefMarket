import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user";
import { CartProvider } from "./context/cart";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
