import React, { useContext } from "react";
import { Container, Segment } from "semantic-ui-react";
import Cart from "./Cart";
import Inventory from "./Inventory";
import { UserContext } from "../context/user";

function Home(props) {
  const [user] = useContext(UserContext);

  return (
    <>
      {!user && (
        <Segment raised>
          <Container text>
            <p>Welcome to Beef Market!</p>{" "}
            <p>
              To get started, please sign up or login to an existing account!
            </p>
          </Container>
        </Segment>
      )}
      {user && (
        <>
          <Cart />
          <Inventory />
        </>
      )}
    </>
  );
}

export default Home;
