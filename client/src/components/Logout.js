import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { UserContext } from "../context/user";

function Logout() {
  const [, setUser] = useContext(UserContext);
  let history = useHistory();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    fetch("/logout", {
      method: "DELETE",
    }).then(async () => {
      setUser(null);
      await sleep(3000);
      history.push("/");
    });
  }, []);
  return (
    <Container text>
      <p>Logging out! Redirecting in 3 seconds ... </p>
    </Container>
  );
}

export default Logout;
