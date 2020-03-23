import React from "react";
import { Link, Button } from "@material-ui/core";
import "./OrderContainer.css";

const OrderContainer = ({ order }) => {
  return (
    <div className="orderContent">
      <div className="restaurantInformation">
        <span className="restaurantDetails">
          <span className="restaurantName">{order.restaurantName}</span>
          <span>${order.total.toFixed(2)}</span>
        </span>
        <div className="address">
          <span>
            DELIVERED TO {order.restaurantAddress.streetAddress}{" "}
            {order.restaurantAddress.city}, {order.restaurantAddress.state}{" "}
            {order.restaurantAddress.zip}
          </span>
        </div>
      </div>
      <div className="itemInformation">
        {order.menuItems.map(item => (
          <>
            <span>{item.name}</span>
            <span id="price">${item.price.toFixed(2)}</span>
          </>
        ))}
      </div>
      <div className="contentActions">
        <Link href={`/orders/${order.orderNumber}`}>Confirmation Page</Link>
      </div>
    </div>
  );
};

export default OrderContainer;
