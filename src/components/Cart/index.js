import React, { useRef, useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import {
  Wrapper,
  Icon,
  CartCount,
  CartSideBar,
  EmptyCart,
  SideBarHeader,
  Card,
  CardBody,
  CardImage,
  CardRemove,
  CardRow,
  CardTitle,
  ClearButton,
} from "./Styles";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Cart = ({
  isToggle,
  setToggle,
  cart,
  removeProductFromCart,
  clearCart,
}) => {
  const $sideBarRef = useRef();

  useOnClickOutside($sideBarRef, () => setToggle(false));

  const [updatedCart, setUpdatedCart] = useState(false);

  useEffect(() => {
    if (cart.length > 0) setUpdatedCart(true);
  }, [cart]);

  const handleToggle = () => {
    setUpdatedCart(false);
    setToggle(true);
  };

  return (
    <>
      <Wrapper onClick={handleToggle}>
        <Icon icon={faShoppingCart}></Icon>
        <motion.div
          initial={{ scale: 1 }}
          animate={updatedCart ? { scale: [1, 2, 1] } : null}
          transition={{ delay: 0 }}
        >
          <CartCount>{cart.length}</CartCount>
        </motion.div>
      </Wrapper>

      <CartSideBar ref={$sideBarRef} className={isToggle ? "expand" : "shrink"}>
        <SideBarHeader>shopping cart</SideBarHeader>
        {cart.length === 0 ? (
          <EmptyCart>Empty Cart</EmptyCart>
        ) : (
          cart.map(({ product, quantity }) => (
            <Card key={product.id}>
              <CardImage src={product.imageURL} />
              <CardBody>
                <CardRow>
                  <CardTitle>{product.title}</CardTitle>
                  <CardRemove
                    icon={faTimes}
                    onClick={() => removeProductFromCart(product.id)}
                  />
                </CardRow>
                <CardRow>
                  <CardTitle>
                    Total Quantity ({quantity}) - ${product.price * quantity}
                  </CardTitle>
                </CardRow>
              </CardBody>
            </Card>
          ))
        )}

        {cart.length !== 0 && (
          <ClearButton onClick={() => clearCart()}>Clear Cart</ClearButton>
        )}
      </CartSideBar>
    </>
  );
};

export default Cart;
