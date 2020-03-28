import React, { useEffect, useState } from "react";
import Axios from "axios";
import orderConfirm from "./vectors/OrderConfirmation.png";
import { Divider, Button, Link } from "@material-ui/core";
import "./OrderConfirmation.css";
import NumberFormat from "react-number-format";

const OrderConfirmation = ({
  match: {
    params: { number }
  }
}) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState("");
  const [address, setAddress] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cardHolder: ""
  });
  const [restaurant, setRestaurant] = useState("");
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    Axios.get(`/orderConfirmation/${number}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    })
      .then(res => {
        if (res.status === 200) {
          setOrderNumber(res.data.orderNumber);
          setItems(res.data.menuItems);
          setTotal(res.data.total);
          setAddress(res.data.customerDetails.address);
          setRestaurant({
            name: res.data.restaurantName,
            address: res.data.restaurantAddress.streetAddress
          });
          setOrderDate(res.data.orderPlacedDate);
          return res.data.paymentMethod;
        }
      })
      .then(data => {
        setPaymentDetails({
          cardHolder: data.cardHolderName,
          cardNumber: data.cardNumber.substring(data.cardNumber.length - 4),
          expirationDate: data.expirationDate
        });
      });
  }, []);

  return (
    <div className="orderConfirmation">
      <div className="openingImg">
        <h1>Thanks for ordering!</h1>
        <img src={orderConfirm} alt="Order Confirmation" />
      </div>
      <div className="orderInfo">
        <div className="orderDetails">
          <div className="orderDetailsPaymentMethod">
            <h2>Payment Method</h2>
            <img
              src="https://img.icons8.com/color/48/000000/visa.png"
              alt="Visa"
            />
            <p className="secondaryText">
              Card number ending in {paymentDetails.cardNumber}
            </p>
          </div>
          <div className="orderDetailsAddress">
            <h2>Delivery Address</h2>
            <div className="secondaryText">
              <p>{address.streetAddress}</p>
              <p>
                {address.city} {address.state}
              </p>
              <p>{address.zip}</p>
            </div>
          </div>
        </div>
        <Divider />
        <div className="orderItems">
          <h4>{restaurant.name}</h4>
          <h4>{restaurant.address}</h4>
          <Divider />
          <h3>Order #{orderNumber.toUpperCase()}</h3>
          <h5 className="secondaryText">{orderDate}</h5>
          <Divider />
          {items.map(item => (
            <div className="item">
              <p className="firstCol">
                <img src={item.urlPath} alt={item.name} />
                {item.name}
              </p>
              <p align="right">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <Divider />
        <div className="orderTotal">
          <p>
            <strong>Total</strong>
          </p>
          <p>
            <NumberFormat
              value={total}
              prefix="$"
              fixedDecimalScale={true}
              decimalScale={2}
              displayType="text"
            />
          </p>
        </div>
        <div className="exitButton">
          <Link color="secondary" href="/restaurants">
            Back To Home Screen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
