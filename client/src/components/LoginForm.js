import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function LoginForm(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState([]);

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.error) {
          setError([response.error]);
        } else {
          setError([]);
          setUser(response);
          history.push("/");
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          Login to your account
        </Header>
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Username (Your email you signed up with):</label>
              <input
                placeholder={"Please enter your username."}
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Password:</label>
              <input
                type={"password"}
                placeholder={"Please enter your password."}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </Form.Field>
            <Button type={"submit"}>Login</Button>
            {error.length > 0 && <Message>{error}</Message>}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;
