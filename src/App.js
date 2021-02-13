import React, { useState, useContext, useEffect } from "react";

import GlobalStyles from "./GlobalStyles";
import { NavBar, MainContainer, OverLay, ProductList } from "./AppStyles";
import Cart from "./components/Cart";
import Context from "./store/Context";
import Product from "./components/Product";
import { motion } from "framer-motion";

const App = () => {
  const [isToggle, setToggle] = useState(false);
  const context = useContext(Context);

  useEffect(() => {
    console.log(context);
  }, [context]);

  return (
    <>
      <GlobalStyles />
      <NavBar>
        <Cart
          cart={context.cart}
          removeProductFromCart={context.removeProductFromCart}
          clearCart={context.clearCart}
          isToggle={isToggle}
          setToggle={setToggle}
        ></Cart>
      </NavBar>

      <MainContainer>
        {isToggle && <OverLay />}
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0 }}
        >
          <ProductList>
            {context.products.map((p) => (
              <Product
                key={p.id}
                id={p.id}
                title={p.title}
                imageURL={p.imageURL}
                price={p.price}
                addProductToCart={context.addProductToCart}
              ></Product>
            ))}
          </ProductList>
        </motion.div>
      </MainContainer>
    </>
  );
};

export default App;
