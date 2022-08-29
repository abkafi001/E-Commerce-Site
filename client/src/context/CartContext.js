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
      index = state.cart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      if (index === -1) {
        return {
          cart: [...state.cart, { ...action.payload, unit: 1 }],
        };
      } else {
        state.cart[index].unit += 1;
        return {
          cart: state.cart,
        };
      }

    case "REMOVE":
      index = state.cart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      if (index === -1) {
        return {
          cart: state.cart,
        };
      } else {
        if (state.cart[index].unit === 1) {
          return {
            cart: state.cart.filter(
              (item) => item.product_id !== action.payload.product_id
            ),
          };
        } else {
          state.cart[index].unit -= 1;
          return {
            cart: state.cart,
          };
        }
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
