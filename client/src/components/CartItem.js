import React from "react";
import { Button, Icon, Item } from "semantic-ui-react";

function CartItem(props) {
  return (
    <Item>
      <Item.Image src={props.item.image_url} />
      <Item.Content>
        <Item.Header>{props.item.name}</Item.Header>
        <Item.Meta>
          <span className={"price"}>$ {props.item.price}/unit</span>
        </Item.Meta>
        <Item.Meta>
          <span className={"quantity"}>
            Quantity: {props.item.quantity} Unit(s)
          </span>
        </Item.Meta>
        <Item.Meta>
          <span className={"total"}>
            Total: $ {props.item.quantity * props.item.price}
          </span>
        </Item.Meta>
        <Item.Extra>
          <Button
            primary
            floated="right"
            onClick={() => props.removeFromCart(props.item.id)}
          >
            <Icon name="delete" /> Remove From Cart
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default CartItem;
