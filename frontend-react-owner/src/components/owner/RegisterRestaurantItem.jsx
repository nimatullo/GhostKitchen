import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";

const RegisterRestaurantItem = ({ item }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={item.name}
        secondary={
          <Typography>${parseFloat(item.price).toFixed(2)}</Typography>
        }
      />
    </ListItem>
  );
};

export default RegisterRestaurantItem;
