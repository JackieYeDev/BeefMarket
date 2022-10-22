import React, { useState } from "react";
import { Icon, Menu, Segment } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

function MenuBar(props) {
  const [activeItem, setActiveItem] = useState("");
  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item header>Beef Market</Menu.Item>
        {!props.user && (
          <>
            <Menu.Item
              position={"right"}
              name={"Signup"}
              active={activeItem === "Signup"}
              onClick={() => {
                setActiveItem("Signup");
              }}
              as={NavLink}
              exact
              to={"/signup"}
            >
              <Icon name="wpforms" /> Signup
            </Menu.Item>
            <Menu.Item
              name={"Login"}
              active={activeItem === "Login"}
              onClick={() => {
                setActiveItem("Login");
              }}
              as={NavLink}
              exact
              to={"/login"}
            >
              <Icon name="sign-in" /> Login
            </Menu.Item>
          </>
        )}
        {props.user && (
          <>
            <Menu.Item
              name={"Inventory"}
              active={activeItem === "Inventory"}
              onClick={() => {
                setActiveItem("Inventory");
              }}
              as={NavLink}
              exact
              to={"/inventory"}
            >
              Inventory
            </Menu.Item>
            <Menu.Item
              position={"right"}
              name={"Orders"}
              active={activeItem === "Orders"}
              onClick={() => {
                setActiveItem("Orders");
              }}
              as={NavLink}
              exact
              to={"/orders"}
            >
              <Icon name="file outline" /> View Orders
            </Menu.Item>
            <Menu.Item
              name={"Cart"}
              active={activeItem === "Cart"}
              onClick={() => {
                setActiveItem("Cart");
              }}
              as={NavLink}
              exact
              to={"/cart"}
            >
              <Icon name="cart" /> View Cart
            </Menu.Item>
            <Menu.Item
              name={"Logout"}
              active={activeItem === "Logout"}
              onClick={() => {
                setActiveItem("Logout");
              }}
              as={NavLink}
              exact
              to={"/logout"}
            >
              <Icon name="sign-out" /> Logout
            </Menu.Item>
          </>
        )}
      </Menu>
    </Segment>
  );
}

export default MenuBar;
