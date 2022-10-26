import React, { useEffect, useState } from "react";
import {
  Accordion,
  Container,
  Grid,
  Icon,
  Item,
  Segment,
} from "semantic-ui-react";

function Order() {
  const [orders, setOrders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
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
  function convertDateToString(date) {
    const stringDate = new Date(date);
    const fullDate =
      stringDate.getMonth() +
      1 +
      "-" +
      stringDate.getDate() +
      "-" +
      stringDate.getFullYear();
    return fullDate;
  }
  return (
    <>
      {orders.length > 0 && (
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Accordion styled>
              {orders.map((order, i) => (
                <div key={i}>
                  <Accordion.Title
                    active={activeIndex === i}
                    index={i}
                    onClick={() => {
                      const newIndex = activeIndex === i ? -1 : i;
                      setActiveIndex(newIndex);
                    }}
                  >
                    <Icon name="dropdown" />
                    Order ID#{order.id} --- Order Date:{" "}
                    {convertDateToString(order.created_at)}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === i}>
                    {order.order_details.map((detail, a) => (
                      <Item key={a}>
                        <Item.Header>{detail.product_name}</Item.Header>
                        <Item.Meta>Quantity: {detail.quantity}</Item.Meta>
                        <Item.Meta>${detail.price} / unit</Item.Meta>
                        <Item.Content>
                          Total: $ {detail.quantity * detail.price}
                        </Item.Content>
                      </Item>
                    ))}
                    <p>
                      <Item.Meta>Order Total: $ {order.order_total}</Item.Meta>
                    </p>
                  </Accordion.Content>
                </div>
              ))}
            </Accordion>
          </Grid.Column>
        </Grid>
      )}
    </>
  );
}

export default Order;
