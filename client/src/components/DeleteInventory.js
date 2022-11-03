import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";

function DeleteInventory() {
  const [inventory, setInventory] = useState([]);
  let history = useHistory();
  useEffect(() => {
    fetch("/inventories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        r.json().then((response) => setInventory(response));
      } else {
        history.push("/login");
      }
    });
  }, []);

  function deleteProduct(i) {
    console.log(i.id);
    fetch(`/inventories/${i.id}`, {
      method: "DELETE",
    }).then(() => setInventory(inventory.filter((item) => item.id !== i.id)));
  }
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 1000 }}>
        <Card.Group>
          {inventory.length > 0 &&
            inventory.map((i) => (
              <Card key={i.id}>
                <Image src={i.image_url} />
                <Card.Content>
                  <Card.Header>{i.name}</Card.Header>
                  <Card.Meta>
                    <span className={"description"}>${i.price}/unit</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button
                    type={"submit"}
                    color={"red"}
                    onClick={() => deleteProduct(i)}
                  >
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
}

export default DeleteInventory;
