import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ProductsContextProvider } from "./context/ProductContext";
import { CartContextProvider } from "./context/CartContext";

ReactDOM.render(
  <AuthContextProvider>
    <ProductsContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ProductsContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
