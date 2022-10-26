import React, { useEffect, useState } from "react";
import { Container, Grid, Item, Segment } from "semantic-ui-react";

function Order() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((response) => {
        console.log(response);
        setOrders([...response]);
      });
  }, []);
  return (
    <>
      {orders.length > 0 && (
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            {orders.map((order) => (
              <Segment>
                <Item>
                  <Item.Content>
                    <p>
                      <Item.Header>
                        <b>Order Date: {order.created_at.slice(0, 10)}</b>
                      </Item.Header>
                      <Item.Meta>
                        <span>Order ID#{order.id}</span>
                      </Item.Meta>
                    </p>
                    {order.order_details.map((detail) => (
                      <p>
                        <Item.Meta>{detail.product_name}</Item.Meta>
                        <Item.Meta>Quantity: {detail.quantity}</Item.Meta>
                        <Item.Meta>${detail.price} / unit</Item.Meta>
                        <Item.Meta>
                          Total: $ {detail.quantity * detail.price}
                        </Item.Meta>
                      </p>
                    ))}
                    <p>
                      <Item.Meta>Order Total: $ {order.order_total}</Item.Meta>
                    </p>
                  </Item.Content>
                </Item>
              </Segment>
            ))}
          </Grid.Column>
        </Grid>
      )}
    </>
  );
}

export default Order;
