import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../context/cart";

function Inventory(props) {
  const [inventory, setInventory] = useState([]);
  const [cartData, setCartData] = useContext(CartContext);
  let history = useHistory();
  useEffect(() => {
    fetch("/inventories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.status === 500) {
          history.push("/login");
        } else {
          setInventory(response);
        }
      });
  }, []);

  function addToCart(data) {
    data = { ...data, quantity: 1 };
    if (cartData.find((c) => c.id === data.id)) {
      const newCartData = cartData.map((c) => {
        if (c.id === data.id) {
          return { ...c, quantity: c.quantity + 1 };
        } else {
          return c;
        }
      });
      setCartData(newCartData);
    } else {
      setCartData([...cartData, data]);
    }
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
