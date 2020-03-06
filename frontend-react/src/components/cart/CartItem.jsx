import React, { useContext, useState } from "react";
import {
  Divider,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Snackbar
} from "@material-ui/core";
import { ItemContext } from "../contexts/ItemContext";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import Alert from "../Alert";

const CartItem = ({ itemInfo }) => {
  const { removeItem, jwtToken } = useContext(ItemContext);
  const [open, setOpen] = useState(false);
  const handleClick = item => {
    Axios.put(`/cart/remove/${item.id}`, {}, jwtToken);
    removeItem(item);
    setOpen(true);
    setTimeout(() => setOpen(false), 2000);
  };
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={itemInfo.name}
          secondary={<Typography>${itemInfo.price.toFixed(2)}</Typography>}
        />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => handleClick(itemInfo)}
            edge="end"
            arial-label="remove"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
      <Snackbar open={open}>
        <Alert severity="success">Item removed</Alert>
      </Snackbar>
    </div>
  );
};

export default CartItem;
