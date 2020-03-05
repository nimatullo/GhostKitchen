import React, { useContext } from "react";
import { List, Button } from "@material-ui/core";
import CartItem from "./CartItem";
import { ItemContext } from "../contexts/ItemContext";
import Axios from "axios";

const Cart = ({ restaurantId }) => {
  const { items, total, jwtToken } = useContext(ItemContext);

  const submitOrder = () => {
    console.log("ran");
    const data = {
      items: items,
      numberOfItems: items.length,
      total: total
    };
    Axios.post(`/restaurants/${restaurantId}/submitOrder`, data, jwtToken);
  };

  return (
    <div>
      <List>
        {items.map(item => (
          <CartItem itemInfo={item} />
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
