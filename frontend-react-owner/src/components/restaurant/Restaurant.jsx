import React, { useEffect, useState } from "react";
import Axios from "axios";
import MenuItem from "./MenuItem";
import { Tooltip, Link } from "@material-ui/core";
import "./Restaurant.css";
import AddIcon from "@material-ui/icons/Add";
import Carousel from "../carousel/Carousel";
import { useHistory } from "react-router-dom";

const Restaurant = () => {
  const history = useHistory();
  const [address, setAddress] = useState({});
  const [restaurantName, setRestaurantName] = useState("");
  const [items, setItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [rating, setRating] = useState("");
  useEffect(() => {
    Axios.get("/MyRestaurant", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.data)
      .then(data => {
        setAddress(data.address);
        setItems(data.menuItems);
        setPastOrders(data.pastOrders);
        setRestaurantName(data.restaurantName);
        setRestaurantId(data.id);
        setRating(data.rating);
      })
      .catch(err => {
        if (err.response.status === 404) {
          history.push("/register/restaurant");
        }
      });
  }, []);

  const goToAdd = () => {
    history.push({ pathname: "/restaurant/additem", orders: pastOrders });
  };

  const getPastOrders = () => {
    if (pastOrders.length === 0) {
      return <p>No one has yet placed an order.</p>;
    } else {
      return <Carousel orders={pastOrders} />;
    }
  };

  return (
    <main>
      <div className="extra-info">
        <div className="restaurantInfo">
          <h2>{restaurantName}</h2>
          <div className="address">
            <p>{address.streetAddress}</p>
            <p>
              {address.city}, {address.state}
            </p>
            <p>{address.zip}</p>
            <Link href="/myrestaurant/ratings">Average Rating: {rating}</Link>
          </div>
        </div>
        <div className="pastOrders">{getPastOrders()}</div>
      </div>
      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map(menuItem => (
              <MenuItem restaurantId={restaurantId} menuItem={menuItem} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="fab">
        <Tooltip title="Add New Item">
          <button onClick={goToAdd}>
            <AddIcon />
          </button>
        </Tooltip>
      </div>
    </main>
  );
};

export default Restaurant;
