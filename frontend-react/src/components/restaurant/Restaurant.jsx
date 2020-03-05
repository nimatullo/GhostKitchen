import React, { useState, useEffect } from "react";
import Axios from "axios";
import MenuItem from "../menu/MenuItem";
import Address from "./Address";
import Cart from "../cart/Cart";
import ItemContextProvider from "../contexts/ItemContext";
import { Grid } from "@material-ui/core";

const Restaurant = ({
  match: {
    params: { id }
  }
}) => {
  const jwtToken = {
    headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
  };
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    Axios.get(`/restaurants/${id}/menu`, jwtToken)
      .then(res => res.data)
      .then(data => setMenu(data.menuItems));
  }, []);

  useEffect(() => {
    Axios.get(`/restaurants/${id}`, jwtToken)
      .then(res => {
        setRestaurant(res.data);
        return res.data.address;
      })
      .then(data => {
        setAddress(data);
      });
  }, []);

  return (
    <div style={{ margin: "1em" }}>
      <ItemContextProvider>
        <Cart />
        <h1>{restaurant.name}</h1>
        <h3>{address.streetAddress}</h3>
        <h3>
          {address.city}, {address.state}
        </h3>
        <h3>{address.zip}</h3>
        <Grid container spacing={2}>
          {menu.map(menuItemInfo => (
            <Grid item xs={3}>
              <MenuItem menuItem={menuItemInfo} />
            </Grid>
          ))}
        </Grid>
      </ItemContextProvider>
    </div>
  );
};

export default Restaurant;
