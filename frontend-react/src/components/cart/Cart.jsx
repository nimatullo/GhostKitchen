import React, { useContext } from "react";
import { List } from "@material-ui/core";
import CartItem from "./CartItem";
import { ItemContext } from "../contexts/ItemContext";

const Cart = () => {
  const { items, total } = useContext(ItemContext);

  return (
    <div>
      <List>
        {items.map(item => (
          <CartItem itemInfo={item} />
        ))}
      </List>
      <p>${total.toFixed(2)}</p>
    </div>
  );
};

export default Cart;
