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
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";
import "./MenuItem.css";

const MenuItem = ({ menuItem }) => {
  const { addToItems } = useContext(ItemContext);
  const [open, setOpen] = useState(false);
  const handleClick = id => {
    Axios.post(`${BASE_URL}/users/cart/add/${id}`, {}, JWT_TOKEN).then(res => {
      addToItems(menuItem);
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    });
  };

  return (
    <div className="menuItem">
      <img className="itemImg" src={menuItem.urlPath} alt={menuItem.name} />
      <div className="itemInfo">
        <h2>{menuItem.name}</h2>
        <p>{menuItem.description}</p>
      </div>
      <div className="button_price">
        <p>${menuItem.price.toFixed(2)}</p>
        <Button
          startIcon={<AddShoppingCartIcon />}
          variant="contained"
          color="secondary"
          onClick={() => handleClick(menuItem.id)}
        >
          Add To Cart
        </Button>
      </div>

      {/* <CardMedia style={{ height: "250px" }} image={menuItem.urlPath} />
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
      </CardActions> */}
      <Snackbar open={open}>
        <Alert severity="success">Item added</Alert>
      </Snackbar>
    </div>
  );
};

export default MenuItem;
