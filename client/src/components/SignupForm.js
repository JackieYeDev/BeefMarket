import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
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
    admin: false,
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
        admin: formData.admin,
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

  function updateFormData(e) {
    setFormData({ ...formData, [`${e.target.name}`]: `${e.target.value}` });
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
                name={"username"}
                placeholder={"Please enter an email address!"}
                value={formData.username}
                onChange={(e) => updateFormData(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Password: </label>
              <input
                name={"password"}
                type={"password"}
                placeholder={
                  "Please enter a password with at least 6 characters!"
                }
                value={formData.password}
                onChange={(e) => updateFormData(e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password: </label>
              <input
                name={"passwordConfirmation"}
                type={"password"}
                placeholder={"Please enter the same password again!"}
                value={formData.passwordConfirmation}
                onChange={(e) => updateFormData(e)}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label={"Admin priveleges?"}
                checked={formData.admin}
                onClick={() =>
                  setFormData({ ...formData, admin: !formData.admin })
                }
              ></Checkbox>
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
