import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_ALL_FROM_CART } from "./types";

const addProductToCart = (state, product) => {
  const copy = [...state.cart];

  const curItemIndex = copy.findIndex((i) => {
    return i.product.id === product.id;
  });

  if (curItemIndex < 0) {
    copy.push({ product, quantity: 1 });
  } else {
    const copyItem = { ...copy[curItemIndex] };
    copyItem.quantity++;
    copy[curItemIndex] = copyItem;
  }

  //update state
  return { ...state, cart: copy };
};

const removeProductFromCart = (state, productID) => {
  let copy = [...state.cart];
  const curItemIndex = copy.findIndex((i) => i.product.id === productID);
  console.log(curItemIndex);
  if (curItemIndex >= 0) {
    const curItem = { ...copy[curItemIndex] };
    curItem.quantity--;
    if (curItem.quantity <= 0) {
      if (copy.length === 1) copy = [];
      copy.splice(curItemIndex, 1);
    } else {
      copy[curItemIndex] = curItem;
    }
  }

  return { ...state, cart: copy };
};

const clearCart = (state) => {
  return { ...state, cart: [] };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addProductToCart(state, action.payload);
    case REMOVE_FROM_CART:
      return removeProductFromCart(state, action.payload);
    case CLEAR_ALL_FROM_CART:
      return clearCart(state);
    default:
      return state;
  }
};
