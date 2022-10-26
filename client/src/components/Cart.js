import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Item,
  ItemGroup,
  Message,
} from "semantic-ui-react";
import CartItem from "./CartItem";
import { CartContext } from "../context/cart";

function Cart(props) {
  const [cartData, setCartData] = useContext(CartContext);
  const [message, setMessage] = useState("");
  function onRemoveFromCart(objID) {
    const updatedCart = cartData.filter((item) => {
      if (objID !== item.id) {
        return item;
      }
    });
    setCartData(updatedCart);
  }
  useEffect(() => {
    setMessage("");
  }, []);
  const cartTotal = () =>
    cartData.length > 0
      ? cartData.reduce((a, b) => a + b.price * b.quantity, 0.0)
      : 0;
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_total: cartTotal(),
        order_array: cartData,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((response) => {
          setMessage("Your order has been successfully submitted!");
          setCartData([]);
        });
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 750 }}>
          <ItemGroup>
            {cartData.length > 0 ? (
              cartData.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeFromCart={onRemoveFromCart}
                  />
                );
              })
            ) : (
              <span>Your cart is empty!</span>
            )}
            <Item>
              <Item.Content>
                <span>Total: ${cartTotal()}</span>
              </Item.Content>
            </Item>
          </ItemGroup>
          <Button type={"submit"}>Submit Order!</Button>
          {message !== "" ? <Message positive>{message}</Message> : null}
        </Grid.Column>
      </Grid>
    </Form>
  );
}

export default Cart;
