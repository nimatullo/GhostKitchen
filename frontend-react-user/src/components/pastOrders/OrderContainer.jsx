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
          <div className="dateOfOrder">
            <span>{order.orderPlacedDate}</span>
          </div>
          <span>
            {order.delivered ? "DELIVERED " : "ON THE WAY TO "}TO{" "}
            {order.customerDetails.address.streetAddress}{" "}
            {order.customerDetails.address.city},{" "}
            {order.customerDetails.address.state}{" "}
            {order.customerDetails.address.zip}
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
