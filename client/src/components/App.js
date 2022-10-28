import "../App.css";
import { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import Inventory from "./Inventory";
import MenuBar from "./MenuBar";
import { Container, Segment } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Logout from "./Logout";
import { UserContext } from "../context/user";
import Home from "./Home";
import { CartContext } from "../context/cart";
import Order from "./Order";

function App() {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          console.log(user);
          setUser(user);
        });
      }
    });
  }, []);
  const routerLinks = [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "login",
      path: "/login",
      component: LoginForm,
    },
    {
      name: "logout",
      path: "/logout",
      component: Logout,
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
      component: Order,
    },
    {
      name: "cart",
      path: "/cart",
      component: Cart,
    },
  ];

  return (
    <div className="App">
      <MenuBar user={user} routerLinks={routerLinks} />
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
