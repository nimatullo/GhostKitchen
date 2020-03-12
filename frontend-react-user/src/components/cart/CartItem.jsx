import React, { useContext, useState } from "react";
import { Divider, IconButton, Snackbar } from "@material-ui/core";
import { ItemContext } from "../contexts/ItemContext";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import Alert from "../Alert";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";
import "./CartItem.css";

const CartItem = ({ itemInfo }) => {
  const { removeItem } = useContext(ItemContext);
  const [open, setOpen] = useState(false);
  const handleClick = item => {
    Axios.put(
      `${BASE_URL}/users/cart/remove/${item.id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      }
    );
    removeItem(item);
    setOpen(true);
    setTimeout(() => setOpen(false), 2000);
  };
  return (
    <div className="cart-item-container">
      <div className="cart-item-content">
        <h4 className="itemName">{itemInfo.name}</h4>
        <button className="removeItem" onClick={() => handleClick(itemInfo)}>
          <DeleteIcon color="action" />
        </button>
        <h5 className="itemPrice">${itemInfo.price.toFixed(2)}</h5>
      </div>
      <Divider />
      <Snackbar open={open}>
        <Alert severity="success">Item removed</Alert>
      </Snackbar>
    </div>
  );
};

export default CartItem;
