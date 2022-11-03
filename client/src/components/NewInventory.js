import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

function NewInventory() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0.0,
    stock: 0,
    imageUrl: "",
  });

  const [messages, setMessages] = useState([]);

  let history = useHistory();

  useEffect(() => {
    // Clears previous messages
    setMessages([]);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
        image_url: formData.imageUrl,
      }),
    }).then((r) => {
      if (r.ok) {
        setMessages([
          `You have successfully added ${formData.name} to your inventory.`,
        ]);
      } else {
        r.json().then((response) => {
          setMessages([response.error]);
        });
      }
    });
  }

  function updateFormData(e) {
    setFormData({ ...formData, [`${e.target.name}`]: `${e.target.value}` });
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          New Product to Inventory Form
        </Header>
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Product Name:</label>
              <input
                name={"name"}
                placeholder={"Please enter the product name!"}
                value={formData.name}
                onChange={(e) => updateFormData(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Price: </label>
              <input
                name={"price"}
                type={"number"}
                step={0.01}
                value={formData.price}
                onChange={(e) => updateFormData(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Amount of Stock Quantity: </label>
              <input
                name={"stock"}
                type={"number"}
                value={formData.stock}
                onChange={(e) => updateFormData(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Image Url: </label>
              <input
                name={"imageUrl"}
                placeholder={"Please enter the product's image url!"}
                value={formData.imageUrl}
                onChange={(e) => updateFormData(e)}
              />
            </Form.Field>
            <Button type={"submit"}>Add Product!</Button>
          </Form>
          {messages.length > 0 && (
            <Message>
              {messages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </Message>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
export default NewInventory;
