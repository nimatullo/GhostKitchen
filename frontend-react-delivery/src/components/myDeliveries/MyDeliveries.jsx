import React, { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import MyDeliveriesItem from "./MyDeliveriesItem";
import "../orders/AvailableOrders.css";

const AvailableOrders = () => {
  const [availableOrdersList, setAvailableOrdersList] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    Axios.get("/delivery/myDeliveries", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => {
      console.log(res.data);
      setAvailableOrdersList(res.data);
    });
  }, [reload]);
  return (
    <div className="deliveryList">
      <h1>My Deliveries</h1>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Restaurant</th>
            <th>Delivery Address</th>
            <th>Order Number</th>
            <th>Number of Items</th>
            <th>Total</th>
            <th>Delivered</th>
          </tr>
        </thead>
        <tbody>
          {availableOrdersList.map(delivery => (
            <MyDeliveriesItem
              reload={reload}
              setReload={setReload}
              delivery={delivery}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableOrders;
