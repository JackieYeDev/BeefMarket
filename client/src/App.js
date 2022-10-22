import "./App.css";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import Cart from "./Cart";

function App() {
  const [user, setUser] = useState(null);
  const [cartData, setCartData] = useState([]);
  function onRemoveFromCart(objID) {
    const updatedCart = cartData.filter((item) => {
      if (objID !== item.id) {
        return item;
      }
    });
    setCartData(updatedCart);
  }
  // Create an initial cart for testing purposes
  useEffect(() => {
    setCartData([
      {
        id: 1,
        name: "Striploin",
        price: "49.99",
        quantity: 2,
        imageURL: "https://react.semantic-ui.com/images/wireframe/image.png",
      },
      {
        id: 2,
        name: "Flank Steak",
        price: "29.99",
        quantity: 2,
        imageURL: "https://react.semantic-ui.com/images/wireframe/image.png",
      },
      {
        id: 3,
        name: "NY Strip (Wagyu)",
        price: "399.99",
        quantity: 3,
        imageURL: "https://react.semantic-ui.com/images/wireframe/image.png",
      },
    ]);
  }, []);
  return (
    <div className="App">
      <LoginForm />
      <Cart cartData={cartData} removeFromCart={onRemoveFromCart} />
    </div>
  );
}

export default App;
