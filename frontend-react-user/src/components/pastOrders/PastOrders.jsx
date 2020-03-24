import React from "react";
import Axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constant/constantVariables";
import { useState } from "react";
import OrderContainer from "./OrderContainer";
import "./PastOrders.css";

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    Axios.get(`${BASE_URL}/user/pastOrders`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => {
      setOrders(res.data);
    });
  }, []);
  return (
    <div className="past-orders">
      {orders.map(order => (
        <OrderContainer order={order} />
      ))}
    </div>
  );
};

export default PastOrders;
