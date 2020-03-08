import React, { useContext, useState } from "react";
import { List, Button, Typography, MenuItem } from "@material-ui/core";
import CartItem from "./CartItem";
import { ItemContext } from "../contexts/ItemContext";
import Axios from "axios";
import {
  useHistory,
  Redirect,
  Route,
  BrowserRouter,
  Switch,
  Link
} from "react-router-dom";
import "./Cart.css";

const Cart = ({ restaurantId }) => {
  const { items, total } = useContext(ItemContext);
  const history = useHistory();

  const submitOrder = () => {
    const data = {
      items: items,
      numberOfItems: items.length,
      total: total
    };
    history.push({
      pathname: "/order/submit",
      items: { items },
      total: { total },
      restaurantId: { restaurantId }
    });
  };

  if (items.length === 0) {
    return (
      <div>
        <Typography color="textSecondary">Your cart is empty.</Typography>
      </div>
    );
  }

  return (
    <div className="cart-component">
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
