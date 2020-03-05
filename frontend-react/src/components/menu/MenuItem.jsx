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
  const { addToItems, addToTotal } = useContext(ItemContext);
  const handleClick = id => {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    };
    fetch(`/cart/add/${id}`, options).then(res => {
      addToItems(menuItem);
      addToTotal(menuItem.price);
    });
  };

  return (
    <Card style={{ maxWidth: "500px", margin: "1em" }}>
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
