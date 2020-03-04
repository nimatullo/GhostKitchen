import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";

const MenuItem = ({ menuItem }) => {
  return (
    <Card style={{ "max-width": "500px", margin: "1em" }}>
      <CardContent>
        <Typography component="h5" color="primary">
          {console.log(menuItem)}
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
          startIcon={<AddCircleIcon />}
          variant="contained"
          color="secondary"
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default MenuItem;
