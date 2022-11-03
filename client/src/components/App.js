import "../App.css";
import { useContext, useEffect } from "react";
import Cart from "./Cart";
import Inventory from "./Inventory";
import MenuBar from "./MenuBar";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Logout from "./Logout";
import { UserContext } from "../context/user";
import Home from "./Home";
import Order from "./Order";
import NewInventory from "./NewInventory";
import DeleteInventory from "./DeleteInventory";

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
      name: "newInventory",
      path: "/newinventory",
      component: NewInventory,
    },
    {
      name: "deleteInventory",
      path: "/deleteinventory",
      component: DeleteInventory,
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
