import React, { useState } from "react";
import { Button, Checkbox, Form, Label, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function SignupForm(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      }),
    })
      .then((r) => r.json())
      .then(() => history.push("/"))
      .catch((err) => console.error(err));
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username (Your email address will be your username):</label>
          <input
            placeholder={"Please enter an email address!"}
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Password: </label>
          <input
            type={"password"}
            placeholder={"Please enter a password with at least 6 characters!"}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password: </label>
          <input
            type={"password"}
            placeholder={"Please enter the same password again!"}
            value={formData.passwordConfirmation}
            onChange={(e) => {
              setFormData({
                ...formData,
                passwordConfirmation: e.target.value,
              });
            }}
          />
        </Form.Field>
        <Button type={"submit"}>Register</Button>
      </Form>
    </Segment>
  );
}

export default SignupForm;
