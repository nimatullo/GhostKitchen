import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import MenuItem from "../menu/MenuItem";
import Address from "./Address";
import Cart from "../cart/Cart";
import ItemContextProvider from "../contexts/ItemContext";
import { Grid } from "@material-ui/core";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";

const Restaurant = ({
  match: {
    params: { id }
  }
}) => {
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    Axios.get(`${BASE_URL}/restaurants/${id}/menu`, JWT_TOKEN)
      .then(res => res.data)
      .then(data => setMenu(data.menuItems));
  }, []);

  useEffect(() => {
    Axios.get(`${BASE_URL}/restaurants/${id}`, JWT_TOKEN)
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
        <Cart restaurantId={id} />
        <h1>{restaurant.name}</h1>
        <h3>{address.streetAddress}</h3>
        <h3>
          {address.city}, {address.state}
        </h3>
        <h3>{address.zip}</h3>
        <Grid container spacing={2}>
          {menu.map(menuItemInfo => (
            <Grid key={menuItemInfo.id} item xs={3}>
              <MenuItem key={menuItemInfo.id} menuItem={menuItemInfo} />
            </Grid>
          ))}
        </Grid>
      </ItemContextProvider>
    </div>
  );
};

export default Restaurant;
