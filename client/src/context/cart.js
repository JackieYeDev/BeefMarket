import React, { useEffect, useState } from "react";
const CartContext = React.createContext();
function CartProvider({ children }) {
  const [cartData, setCartData] = useState([]);
  // // Create an initial cart for testing purposes
  // useEffect(() => {
  //   setCartData([
  //     {
  //       id: 1,
  //       name: "Striploin",
  //       price: "49.99",
  //       quantity: 2,
  //       imageURL: "https://react.semantic-ui.com/images/wireframe/image.png",
  //     },
  //     {
  //       id: 2,
  //       name: "Flank Steak",
  //       price: "29.99",
  //       quantity: 2,
  //       imageURL: "https://react.semantic-ui.com/images/wireframe/image.png",
  //     },
  //     {
  //       id: 3,
  //       name: "NY Strip (Wagyu)",
  //       price: "399.99",
  //       quantity: 3,
  //       imageURL: "https://react.semantic-ui.com/images/wireframe/image.png",
  //     },
  //   ]);
  // }, []);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
