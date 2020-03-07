import React, { useContext, useState } from "react";
import { List, Button, Typography, MenuItem } from "@material-ui/core";
import CartItem from "./CartItem";
import { ItemContext } from "../contexts/ItemContext";
import Axios from "axios";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";

const Cart = ({ restaurantId }) => {
  const { items, total } = useContext(ItemContext);

  const submitOrder = () => {
    const data = {
      items: items,
      numberOfItems: items.length,
      total: total
    };
    Axios.post(
      `${BASE_URL}/restaurants/${restaurantId}/submitOrder`,
      data,
      JWT_TOKEN
    );
  };

  if (items.length === 0) {
    return (
      <div>
        <Typography color="textSecondary">Your cart is empty.</Typography>
      </div>
    );
  }

  return (
    <div>
      <List>
        {items.map(item => (
          <CartItem key={item.id} itemInfo={item} />
        ))}
      </List>
      <p>${total.toFixed(2)}</p>
      <Button onClick={submitOrder} variant="contained" color="primary">
        Submit Order
      </Button>
    </div>
  );
};

export default Cart;
