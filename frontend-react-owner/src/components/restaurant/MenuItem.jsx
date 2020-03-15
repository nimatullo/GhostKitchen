import React, { useContext, useState } from "react";
import {
  Snackbar,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import Axios from "axios";
import "./MenuItem.css";

const MenuItem = ({ menuItem }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => [setOpen(false)];
  const [itemName, setItemName] = useState(menuItem.name);
  const [itemDescription, setItemDescription] = useState(menuItem.description);
  const [price, setPrice] = useState(menuItem.price);

  return (
    <div>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="menuItem"
      >
        <img className="itemImg" src={menuItem.urlPath} alt={menuItem.name} />
        <div className="itemInfo">
          <div class="name-price">
            <h2>{itemName}</h2>
            <h3>${price}</h3>
          </div>
          <div className="description-container">
            <p>{itemDescription}</p>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            value={itemName}
            label="Item Name"
            onChange={e => setItemName(e.target.value)}
          />
          <TextField
            value={itemDescription}
            label="Description"
            onChange={e => setItemDescription(e.target.value)}
          />
          <TextField
            value={price}
            label="Price"
            onChange={e => setPrice(e.target.value)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuItem;
