import "./App.css";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import Inventory from "./Inventory";
import MenuBar from "./MenuBar";
import { Container, Segment } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

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
  const routerLinks = [
    {
      name: "login",
      path: "/login",
      component: LoginForm,
    },
    {
      name: "logout",
      path: "/logout",
      component: null,
    },
    {
      name: "signup",
      path: "/signup",
      component: SignupForm,
    },
    {
      name: "inventory",
      path: "/inventory",
      component: Inventory,
    },
    {
      name: "orders",
      path: "/orders",
      component: null,
    },
    {
      name: "cart",
      path: "/cart",
      component: Cart,
    },
  ];
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
      <MenuBar user={user} routerLinks={routerLinks} />
      {!user && (
        <Segment raised>
          <Container text>
            <p>Welcome to Beef Market!</p>{" "}
            <p>
              To get started, please sign up or login to an existing account!
            </p>
          </Container>
        </Segment>
      )}
      {user && (
        <>
          <Cart cartData={cartData} removeFromCart={onRemoveFromCart} />
          <Inventory />
        </>
      )}
      <Switch>
        {routerLinks.map((link, index) => (
          <Route
            key={index}
            exact
            path={link.path}
            component={link.component}
          ></Route>
        ))}
      </Switch>
    </div>
  );
}

export default App;
