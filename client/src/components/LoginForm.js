import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function LoginForm(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
        history.push("/");
      })
      .catch((err) => console.error(err));
    // .then((user) => onLogin(user));
  }

  return (
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
      </Form>
    </Segment>
  );
}

export default LoginForm;
