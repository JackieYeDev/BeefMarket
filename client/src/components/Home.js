import React, { useContext, useEffect } from "react";
import { Container, Grid, Segment } from "semantic-ui-react";
import Cart from "./Cart";
import Inventory from "./Inventory";
import { UserContext } from "../context/user";

function Home(props) {
  const [user] = useContext(UserContext);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="top">
      {user == null && (
        <Grid.Column style={{ maxWidth: 500 }}>
          <Segment raised>
            <p>Welcome to Beef Market!</p>{" "}
            <p>
              To get started, please sign up or login to an existing account!
            </p>
          </Segment>
        </Grid.Column>
      )}
      {user && (
        <Grid.Column style={{ maxWidth: 700 }}>
          <Segment raised>
            <p>Welcome to Beef Market!</p>{" "}
            <p>
              You can view our beef selections in our inventory, view an
              existing order, or checkout your cart.
            </p>
          </Segment>
        </Grid.Column>
      )}
    </Grid>
  );
}

export default Home;
