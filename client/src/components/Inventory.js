import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Grid, Image, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";

function Inventory(props) {
  // TODO: Add function to decrease inventory stock every time you Add To Cart
  const [inventory, setInventory] = useState([]);
  const [user, setUser] = useContext(UserContext);
  let history = useHistory();
  useEffect(() => {
    fetch("/cart", { method: "GET" }).then((r) => {
      if (r.ok)
        r.json().then((response) => setUser({ ...user, cart: response }));
      else history.push("/login");
    });
    fetch("/inventories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((response) => setInventory(response));
      } else {
        history.push("/login");
      }
    });
  }, []);

  function addToCart(data) {
    fetch("/cart_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart_id: user.cart.id,
        inventory_id: data.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          // Updates frontend of inventory to show decrease in stock to avoid refetching.
          const updatedData = { ...data, stock: data.stock - 1 };
          const updatedInventory = inventory.map((i) =>
            i.id === updatedData.id ? updatedData : i
          );
          setInventory(updatedInventory);
        });
      }
    });
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 1000 }}>
        <Card.Group>
          {inventory.length > 0 &&
            inventory.map((i) => (
              <Card key={i.id}>
                <Image src={i.image_url} />
                <Card.Content>
                  <Card.Header>{i.name}</Card.Header>
                  <Card.Meta>
                    <span className={"description"}>${i.price}/unit</span>
                  </Card.Meta>
                  <Card.Meta>
                    <span className={"description"}>
                      Remaining in Stock: {i.stock}
                    </span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  {i.stock <= 0 ? (
                    <Button disabled={true}>Out of Stock!</Button>
                  ) : (
                    <Button type={"submit"} onClick={() => addToCart(i)}>
                      Add to cart
                    </Button>
                  )}
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
}

export default Inventory;
