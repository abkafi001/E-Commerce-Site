import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  let index = -1;

  switch (action.type) {
    case "SET_CART":
      return {
        cart: action.payload,
      };

    case "ADD":
      // console.log("context: " + Array.isArray(action.payload instanceof Array));
      // console.log("cart: " + Array.isArray(state.cart));
      // console.log(JSON.stringify(action.payload));
      index = state.cart.findIndex(
        (item) => item.product_id === action.payload
      );

      // console.log(state.cart.length);
      // console.log({ index });

      state.cart[index].unit += 1;

      return {
        cart: state.cart,
      };

    case "REMOVE":
      console.log(JSON.stringify(action.payload));
      const cart = state.cart;
      console.log("cart: " + JSON.stringify(cart));

      index = cart.findIndex((item) => item.product_id === action.payload);
      console.log(index);
      console.log("unit: " + cart[index].unit);

      if (cart[index].unit === 1) {
        return {
          cart: cart.filter((item) => item.product_id !== action.payload),
        };
      } else {
        state.cart[index].unit -= 1;
        return {
          cart: state.cart,
        };
      }

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: null,
  });

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
