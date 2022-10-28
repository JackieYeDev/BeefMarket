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
import { UserContext } from "../context/user";

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
  useEffect(() => {
    fetch("/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response);
        setCartData({ ...response });
      });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
            {cartData.cart_items ? (
              cartData.cart_items.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item.inventory}
                    quantity={item.quantity}
                    removeFromCart={onRemoveFromCart}
                  />
                );
              })
            ) : (
              <span>Your cart is empty!</span>
            )}
            <Item>
              <Item.Content>
                <span>Total: ${cartData.total_price}</span>
              </Item.Content>
            </Item>
          </ItemGroup>
          <Button type={"submit"} color={"green"}>
            Submit Order!
          </Button>
          <Button type={"submit"} color={"red"}>
            Empty Cart
          </Button>
          {message !== "" ? <Message positive>{message}</Message> : null}
        </Grid.Column>
      </Grid>
    </Form>
  );
}

export default Cart;
