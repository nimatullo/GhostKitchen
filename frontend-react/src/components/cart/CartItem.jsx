import React from "react";
import { Divider, ListItem, ListItemText, Typography } from "@material-ui/core";

const CartItem = ({ itemInfo }) => {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={itemInfo.name}
          secondary={<Typography>${itemInfo.price.toFixed(2)}</Typography>}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default CartItem;
