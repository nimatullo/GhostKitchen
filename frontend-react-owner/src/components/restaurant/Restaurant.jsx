import React, { useEffect, useState } from "react";
import Axios from "axios";
import MenuItem from "./MenuItem";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import "./Restaurant.css";
import Carousel from "../carousel/Carousel";

const Restaurant = () => {
  const [address, setAddress] = useState({});
  const [restaurantName, setRestaurantName] = useState("");
  const [items, setItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
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
        setRestaurantId(data.id);
      });
  }, []);

  const getPastOrders = () => {
    if (pastOrders.length === 0) {
      return <p>No one has yet placed an order.</p>;
    } else {
      return (
        <Carousel orders={pastOrders} />
        // <div className="recentPurchases">
        //   <h2>Recent User Purchases</h2>
        //   {pastOrders.map(order => (
        //     <>
        //       <p>Order #: {order.orderNumber.toUpperCase()}</p>
        //       <p>
        //         Customer: {order.user.name.firstName} {order.user.name.lastName}
        //       </p>
        //       <p>Total: ${order.total}</p>
        //       <p>Number of items: {order.numberOfItems}</p>
        //       {/* <pre>{JSON.stringify(order, null, 4)}</pre> */}
        //     </>
        //   ))}
        // </div>
      );
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
    </main>
    // <main>
    //   <h1>{restaurantName}</h1>
    //   <div className="address">
    //     <p>{address.streetAddress}</p>
    //     <p>
    //       {address.city}, {address.state}
    //     </p>
    //     <p>{address.zip}</p>
    //   </div>
    //   {getPastOrders()}
    //   <div>
    //     {items.map(menuItem => (
    //       <MenuItem restaurantId={restaurantId} menuItem={menuItem} />
    //     ))}
    //   </div>
    // </main>
  );
};

export default Restaurant;
