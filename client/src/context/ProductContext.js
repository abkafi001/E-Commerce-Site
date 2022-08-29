import React, { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "BUY_PRODUCTS":
      const newProduct = action.payload.map((product_one) => {
        const index = state.products.findIndex(
          (product_two) => product_one.id === product_two.id
        );
        state.products[index].unit -= product_one.unit;
      });

      return {
        products: state.products,
      };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null,
  });

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
