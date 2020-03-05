import React, { useContext } from "react";
import {
  Divider,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { ItemContext } from "../contexts/ItemContext";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";

const CartItem = ({ itemInfo }) => {
  const { removeItem, jwtToken } = useContext(ItemContext);
  const handleClick = item => {
    Axios.put(`/cart/remove/${item.id}`, {}, jwtToken);
    removeItem(item);
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
    </div>
  );
};

export default CartItem;
