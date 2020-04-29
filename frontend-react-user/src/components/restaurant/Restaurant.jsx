import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import MenuItem from "../menu/MenuItem";
import Cart from "../cart/Cart";
import ItemContextProvider from "../contexts/ItemContext";
import { BASE_URL } from "../constant/constantVariables";
import "./Restaurant.css";
import { Divider } from "@material-ui/core";
import { GlobalContext } from "../contexts/GlobalContext";
import NumberFormat from "react-number-format";
import Rating from "./Rating";

const Restaurant = ({
  match: {
    params: { id },
  },
}) => {
  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [address, setAddress] = useState({});
  const [rating, setRating] = useState();
  const [categories, setCategories] = useState([]);
  const { jwtToken } = useContext(GlobalContext);

  useEffect(() => {
    Axios.get(`${BASE_URL}/restaurants/${id}/menu`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => res.data)
      .then((data) => setMenu(data.menuItems));

    Axios.get(`${BASE_URL}/restaurants/${id}/categories`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    }).then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    Axios.get(`${BASE_URL}/restaurants/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => {
        setRestaurant(res.data);
        setRating(res.data.averageRating);
        return res.data.address;
      })
      .then((data) => {
        setAddress(data);
      });
  }, [rating]);

  const changeRating = (newRating) => {
    Axios.put(
      `${BASE_URL}/restaurants/${id}/addRating`,
      { rating: newRating },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }
    ).then((res) => setRating(newRating));
  };

  return (
    <main>
      <ItemContextProvider jwt={jwtToken}>
        <div className="restaurant-main">
          <div className="restaurantInfo">
            <div className="address">
              <div className="name">{restaurant.name}</div>
              <div className="streetAddress secondaryText">
                {address.streetAddress}
              </div>
            </div>
            <div className="rating">
              <Rating
                rating={rating}
                changeRating={changeRating}
                restaurantId={id}
              />
              <div className="number">
                {restaurant.numberOfReviews} Ratings (
                {
                  <NumberFormat
                    displayType="text"
                    format="###"
                    value={rating}
                  />
                }
                )
              </div>
            </div>
          </div>
          <Divider />
          <div className="menu">
            {categories.map((category) => {
              return (
                <div className="categoryRow">
                  <h3>{category}</h3>
                  <div className="categoryRowContent">
                    {menu.map((menuItemInfo) => {
                      if (menuItemInfo.category === category) {
                        return (
                          <MenuItem
                            className="item"
                            key={menuItemInfo.id}
                            menuItem={menuItemInfo}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
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
