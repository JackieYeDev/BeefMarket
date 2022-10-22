import React from "react";
import { Button, Form, Item, ItemGroup } from "semantic-ui-react";
import CartItem from "./CartItem";

function Cart(props) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <ItemGroup>
        {props.cartData.length > 0 ? (
          props.cartData.map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={props.removeFromCart}
              />
            );
          })
        ) : (
          <span>Your cart is empty!</span>
        )}
        <Item>
          <Item.Content>
            <span>
              Total:{" "}
              {props.cartData.length > 0
                ? props.cartData.reduce((a, b) => a + b.price * b.quantity, 0.0)
                : `$ 0`}
            </span>
          </Item.Content>
        </Item>
      </ItemGroup>
      <Button type={"submit"}>Submit Order!</Button>
    </Form>
  );
}

export default Cart;
