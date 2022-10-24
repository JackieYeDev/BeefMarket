import React, { useEffect, useState } from "react";
const CartContext = React.createContext();
function CartProvider({ children }) {
  const [cartData, setCartData] = useState([]);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
