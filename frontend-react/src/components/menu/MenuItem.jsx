import React, { useContext, useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Snackbar
} from "@material-ui/core";
import { ItemContext } from "../contexts/ItemContext";
import Alert from "../Alert";
import Axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";

const MenuItem = ({ menuItem }) => {
  const { addToItems } = useContext(ItemContext);
  const { jwtToken, BASE_URL } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const handleClick = id => {
    Axios.post(`${BASE_URL}/cart/add/${id}`, {}, jwtToken).then(res => {
      addToItems(menuItem);
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    });
  };

  return (
    <Card style={{ maxWidth: "500px" }}>
      <CardMedia style={{ height: "250px" }} image={menuItem.urlPath} />
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
      <Snackbar open={open}>
        <Alert severity="success">Item added</Alert>
      </Snackbar>
    </Card>
  );
};

export default MenuItem;
