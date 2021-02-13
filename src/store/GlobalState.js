import React, { useReducer } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_ALL_FROM_CART } from "./types";

import Context from "./Context";
import Reducer from "./Reducer";

const GlobalState = (props) => {
  const products = [
    {
      id: 0,
      title: "Gaming Mouse",
      imageURL:
        "https://m.media-amazon.com/images/I/51S6IQ2lGwL._AC_UY327_FMwebp_QL65_.jpg",
      price: 49.5,
    },
    {
      id: 1,
      title: "Gaming Chair",
      imageURL:
        "https://m.media-amazon.com/images/I/61HEqHMkRhL._AC_UL480_FMwebp_QL65_.jpg",
      price: 149.0,
    },
    {
      id: 2,
      title: "Gaming Pad",
      imageURL:
        "https://m.media-amazon.com/images/I/71k--F6wVGL._AC_UL480_FMwebp_QL65_.jpg",
      price: 34.5,
    },
  ];

  const [state, dispatch] = useReducer(Reducer, { cart: [] });

  // add product to cart
  const addProductToCart = (product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };

  const removeProductFromCart = (productID) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productID,
    });
  };

  const clearCart = () => {
    dispatch({
      type: CLEAR_ALL_FROM_CART,
    });
  };

  return (
    <Context.Provider
      value={{
        products: products,
        cart: state.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
        clearCart: clearCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalState;
