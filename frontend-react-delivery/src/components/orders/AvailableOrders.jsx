import React, { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import Delivery from "./Delivery";
import "./AvailableOrders.css";

const AvailableOrders = () => {
  const [availableOrdersList, setAvailableOrdersList] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    Axios.get("/delivery/availableDeliveries", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      console.log(res.data);
      setAvailableOrdersList(res.data);
    });
  }, [reload]);
  return (
    <div className="deliveryList">
      {availableOrdersList.length === 0 ? (
        <h1>There are no orders that need to be delivered.</h1>
      ) : (
        <>
          <h1>Available Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Pickup Address</th>
                <th>Delivery Address</th>
                <th>Order Number</th>
                <th>Number of Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {availableOrdersList.map((delivery) => (
                <Delivery
                  reload={reload}
                  setReload={setReload}
                  delivery={delivery}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AvailableOrders;
