import React, { useState, useEffect } from "react";
import Axios from "axios";
import Order from "./Order";
import "./OrderBreakdown.css";
import { BASE_URL } from "../constants";

const OrderBreakdown = ({ props }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    Axios.get(`${BASE_URL}/MyRestaurant`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => setOrders(res.data.pastOrders));
  }, []);
  return (
    <div className="orderBreakdown">
      <h1>Order Breakdown</h1>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Order Number</th>
            <th>Number of Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Order order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBreakdown;
