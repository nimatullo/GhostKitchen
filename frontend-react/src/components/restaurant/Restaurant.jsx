import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import MenuItem from "../menu/MenuItem";
import Cart from "../cart/Cart";
import ItemContextProvider from "../contexts/ItemContext";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";
import "./Restaurant.css";
import Ratings from "react-ratings-declarative";
import { Divider } from "@material-ui/core";

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
            <div className="address">
              <div className="name">{restaurant.name}</div>
              <div className="streetAddress">{address.streetAddress}</div>
            </div>
            <div className="rating">
              <Ratings
                rating={restaurant.rating}
                widgetDimensions="20px"
                widgetRatedColors="gold"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
              <div className="number">{restaurant.numberOfReviews} Ratings</div>
            </div>
          </div>
          <Divider />
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
