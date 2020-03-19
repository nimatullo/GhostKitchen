import React, { useContext } from "react";
import { Typography, Divider } from "@material-ui/core";
import CartItem from "./CartItem";
import { ItemContext } from "../contexts/ItemContext";
import { useHistory } from "react-router-dom";
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

  const content = () => {
    console.log(items);
    if (items.length === 0) {
      return (
        <div className="emptyIndicator">
          <Typography color="textSecondary">
            Click on any item to add it to your bag.
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Your Order</h2>
          {items.map(item => (
            <CartItem key={item.id} itemInfo={item} />
          ))}

          <div className="subtotal">
            <div>Order subtotal:</div>
            <div>${total.toFixed(2)}</div>
          </div>
          <Divider />
          <div className="buttonContainer">
            <button className="submitOrder" onClick={submitOrder}>
              Continue To Checkout
            </button>
          </div>
        </div>
      );
    }
  };

  return <div className="cart-component">{content()}</div>;
};

export default Cart;
