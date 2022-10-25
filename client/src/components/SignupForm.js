import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Label,
  Message,
  Segment,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function SignupForm(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState([]);
  const [, setUser] = useContext(UserContext);

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
    }).then((r) => {
      if (r.ok) {
        setUser(r.json());
        history.push("/");
      } else {
        r.json().then((response) => setErrors(response.errors));
      }
    });
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          Signup for your free account
        </Header>
        <Segment>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>
                Username (Your email address will be your username):
              </label>
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
                placeholder={
                  "Please enter a password with at least 6 characters!"
                }
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
          {errors.length > 0 && (
            <Message>
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </Message>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default SignupForm;
