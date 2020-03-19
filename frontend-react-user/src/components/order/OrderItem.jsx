import React from "react";
import { Divider } from "@material-ui/core";
import "./OrderItem.css";

const OrderItem = ({ itemInfo }) => {
  return (
    <div className="order-item-container">
      <div className="order-item-content">
        <img className="order-item-picture" src={itemInfo.urlPath} alt="" />
        <h4 className="itemName">{itemInfo.name}</h4>
        <h5 className="itemPrice">${itemInfo.price.toFixed(2)}</h5>
      </div>
      <Divider />
    </div>
  );
};

export default OrderItem;
