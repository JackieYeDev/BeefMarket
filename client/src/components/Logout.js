import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import { UserContext } from "../context/user";

function Logout() {
  const [, setUser] = useContext(UserContext);
  let history = useHistory();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    fetch("/logout", {
      method: "DELETE",
    }).then(async () => {
      await sleep(5000);
      history.push("/");
      setUser(null);
    });
  }, []);
  return (
    <Segment>
      <Container text>
        <p>Logging out!</p>
      </Container>
    </Segment>
  );
}

export default Logout;
