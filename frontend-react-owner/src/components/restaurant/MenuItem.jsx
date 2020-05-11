import React, { useState } from "react";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import NumberFormat from "react-number-format";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import Axios from "axios";
import "./MenuItem.css";
import { BASE_URL } from "../constants";

const MenuItem = ({ menuItem, restaurantId }) => {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState(menuItem.name);
  const [itemDescription, setItemDescription] = useState(menuItem.description);
  const [price, setPrice] = useState(menuItem.price);
  const [picture, setPicture] = useState(null);
  const [pictureURL, setPictureURL] = useState(menuItem.urlPath);

  const handleCancel = () => {
    setItemDescription(menuItem.description);
    setPrice(menuItem.price);
    setItemName(menuItem.name);
    setOpen(false);
  };

  const getPicture = (event) => {
    setPicture(event.target.files[0]);
  };

  const addToMenu = () => {
    console.log("ran");
    const data = new FormData();
    data.append("picture", picture);
    data.append("name", itemName);
    data.append("price", price);
    data.append("description", itemDescription);
    Axios.put(`${BASE_URL}/menu/edit/${menuItem.id}`, data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          return res.data;
        } else {
          console.log("Item cannot be updated");
        }
      })
      .then((data) => {
        setPictureURL(data.message);
        setOpen(false);
      });
  };

  return (
    <>
      <tr
        onClick={() => {
          setOpen(true);
        }}
        className="menuItem"
        key={menuItem.name}
      >
        <td style={{ width: "100px" }}>
          <img style={{ width: "100px" }} src={pictureURL} />
        </td>
        <td>{itemName}</td>
        <td>{itemDescription}</td>
        <td>
          {
            <NumberFormat
              allowedDecimalSeparators={true}
              value={price}
              prefix={"$"}
              displayType={"text"}
              fixedDecimalScale={true}
              decimalScale={2}
            />
          }
        </td>
      </tr>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Edit Menu Item</DialogTitle>
        <DialogContent>
          <img className="itemImg" src={menuItem.urlPath} alt={menuItem.name} />
          <input type="file" accept="image/*" onChange={getPicture} />
          <form>
            <TextField
              fullWidth
              margin="dense"
              value={itemName}
              label="Item Name"
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              value={itemDescription}
              label="Description"
              onChange={(e) => setItemDescription(e.target.value)}
            />
            <CurrencyTextField
              textAlign="left"
              margin="dense"
              value={price}
              label="Price"
              decimalCharacter="."
              onChange={(event, value) => setPrice(value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button align="left" variant="outlined" color="secondary">
            Delete
          </Button>
          <div style={{ flex: "1 0 0" }} />
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={addToMenu} variant="outlined" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuItem;
