import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import MenuItem from "../menu/MenuItem";
import Address from "./Address";
import Cart from "../cart/Cart";
import ItemContextProvider from "../contexts/ItemContext";
import { Grid, List, ListItem } from "@material-ui/core";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";
import { Route, Switch } from "react-router-dom";
import SubmitOrder from "../cart/SubmitOrder";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import "./Restaurant.css";

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
    <main>
      <ItemContextProvider>
        <div className="restaurant-main">
          <div className="restaurantInfo">
            <h1>{restaurant.name}</h1>
            <h3>{address.streetAddress}</h3>
            <h3>
              {address.city}, {address.state}
            </h3>
            <h3>{address.zip}</h3>
          </div>
          <div className="menu">
            {menu.map(menuItemInfo => (
              <MenuItem
                className="item"
                key={menuItemInfo.id}
                menuItem={menuItemInfo}
              />
            ))}
          </div>
        </div>
        <div className="cart">
          <Cart className="cart-component" restaurantId={id} />
        </div>
      </ItemContextProvider>
    </main>
  );
};

export default Restaurant;
