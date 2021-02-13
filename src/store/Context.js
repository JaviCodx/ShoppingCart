import { createContext } from "react";

export default createContext({
  products: [],
  cart: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productID) => {},
  clearCart: () => {},
});
