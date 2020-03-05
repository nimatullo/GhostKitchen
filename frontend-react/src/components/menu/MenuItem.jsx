import React, { useContext } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia
} from "@material-ui/core";
import { ItemContext } from "../contexts/ItemContext";
import Axios from "axios";

const MenuItem = ({ menuItem }) => {
  const { addToItems, jwtToken } = useContext(ItemContext);
  const handleClick = id => {
    Axios.post(`/cart/add/${id}`, {}, jwtToken).then(res => {
      addToItems(menuItem);
    });
  };

  return (
    <Card style={{ maxWidth: "500px" }}>
      <CardMedia
        style={{ height: "250px" }}
        image={
          "https://pbs.twimg.com/profile_images/911983532964290560/fI7u-fjO_400x400.jpg"
        }
      />
      <CardContent>
        <Typography component="h5" color="primary">
          {menuItem.name}
        </Typography>
        <Typography component="p" color="textSecondary">
          {menuItem.description}
        </Typography>
        <Typography component="p" color="textPrimary">
          ${menuItem.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<AddShoppingCartIcon />}
          variant="contained"
          color="secondary"
          onClick={() => handleClick(menuItem.id)}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default MenuItem;
