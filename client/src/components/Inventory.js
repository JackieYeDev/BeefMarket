import React, { useEffect, useState } from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";

function Inventory(props) {
  const [inventory, setInventory] = useState([]);
  // useEffect(() => {
  //   fetch("/inventory", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((r) => r.json())
  //     .then((res) => setInventory(res));
  // }, []);
  return (
    <Grid relaxed columns={4}>
      <Card>
        <Image
          src={"https://react.semantic-ui.com/images/wireframe/image.png"}
        />
        <Card.Content>
          <Card.Header>Wagyu</Card.Header>
          <Card.Meta>
            <span className={"description"}>$10/unit</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button type={"submit"}>Add to cart</Button>
        </Card.Content>
      </Card>
    </Grid>
  );
}

export default Inventory;
