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
import { useHistory } from "react-router-dom";

function Cart(props) {
  const [cartData, setCartData] = useContext(CartContext);
  const [message, setMessage] = useState("");
  let history = useHistory();
  function onRemoveFromCart(objID) {
    fetch("/cart_items", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart_item_id: objID }),
    }).then(() => {
      const newCartData = cartData.cart_items.filter(
        (item) => item.id !== objID
      );
      const oldItem = cartData.cart_items.find(
        (element) => element.id === objID
      );
      const newTotalPrice =
        cartData.total_price - oldItem.quantity * oldItem.inventory.price;
      setCartData({
        ...cartData,
        cart_items: newCartData,
        total_price: newTotalPrice,
      });
    });
  }
  function onEmptyCart(e) {
    e.preventDefault();
    fetch("/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setCartData([]);
    });
  }
  useEffect(() => {
    // Clears previous messages
    setMessage("");
  }, []);
  useEffect(() => {
    fetch("/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) r.json().then((response) => setCartData({ ...response }));
      else history.push("/login");
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
        order_total: cartData.total_price,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((response) => {
          setMessage("Your order has been successfully submitted!");
          setCartData([]);
        });
      } else {
        console.log(cartData);
      }
    });
  }
  return (
    <Form>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 750 }}>
          <ItemGroup>
            {cartData.cart_items
              ? cartData.cart_items.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      item={item.inventory}
                      quantity={item.quantity}
                      cartItemId={item.id}
                      removeFromCart={onRemoveFromCart}
                    />
                  );
                })
              : null}
            <Item>
              <Item.Content>
                <span>Total: ${cartData.total_price}</span>
              </Item.Content>
            </Item>
          </ItemGroup>
          <Button
            type={"submit"}
            color={"green"}
            onClick={(e) => handleSubmit(e)}
          >
            Submit Order!
          </Button>
          <Button type={"submit"} color={"red"} onClick={(e) => onEmptyCart(e)}>
            Empty Cart
          </Button>
          {message !== "" ? <Message positive>{message}</Message> : null}
        </Grid.Column>
      </Grid>
    </Form>
  );
}

export default Cart;
