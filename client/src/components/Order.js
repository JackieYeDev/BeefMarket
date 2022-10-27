import React, { useEffect, useState } from "react";
import { Accordion, Grid, Icon, Item } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function Order() {
  const [orders, setOrders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  let history = useHistory();

  useEffect(() => {
    fetch("/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.status === 401) {
        history.push("/login");
      } else {
        r.json().then((response) => {
          console.log(response);
          setOrders([...response]);
        });
      }
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
                    <p>Order Total: $ {order.order_total}</p>
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
