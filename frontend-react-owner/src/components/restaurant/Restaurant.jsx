import React, { useEffect, useState } from "react";
import Axios from "axios";
import MenuItem from "./MenuItem";

const Restaurant = () => {
  const [address, setAddress] = useState({});
  const [restaurantName, setRestaurantName] = useState("");
  const [items, setItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  useEffect(() => {
    Axios.get("/MyRestaurant", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setAddress(data.address);
        setItems(data.menuItems);
        setPastOrders(data.pastOrders);
        setRestaurantName(data.restaurantName);
      });
  }, []);

  const getPastOrders = () => {
    if (pastOrders.length === 0) {
      return <p>No one has yet placed an order.</p>;
    } else {
      return (
        <div className="recentPurchases">
          {pastOrders.map(order => (
            <p>{order.total}</p>
          ))}
        </div>
      );
    }
  };

  return (
    <main>
      <h1>{restaurantName}</h1>
      <div className="address">
        <p>{address.streetAddress}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>{address.zip}</p>
      </div>
      {getPastOrders()}
      <div>
        {items.map(menuItem => (
          <MenuItem menuItem={menuItem} />
        ))}
      </div>
    </main>
  );
};

export default Restaurant;
