import React, { useContext, useState, useEffect } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";
import Axios from "axios";
import "./SubmitOrder.css";
import CartItem from "./CartItem";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import OrderItem from "./OrderItem";
import NumberFormat from "react-number-format";

const SubmitOrder = props => {
  const [items, setItems] = useState();
  const [total, setTotal] = useState();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [paymentPresent, setPaymentPresent] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [address, setAddress] = useState({});

  useEffect(() => {
    Axios.get(`${BASE_URL}/users/cart`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    })
      .then(res => {
        setTotal(res.data.total);
        return res.data;
      })
      .then(data => {
        console.log(data.items);
        setItems(data.items);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${BASE_URL}/user/paymentInfo`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    }).then(res => {
      if (res.data.id) {
        setCardNumber(res.data.payment.cardNumber.replace(/\d(?=\d{4})/g, "*"));
        setPaymentPresent(true);
        setPaymentInfo(res.data.payment);
        setAddress(res.data.address);
      }
    });
  }, []);

  const confirmOrder = () => {
    const data = {
      items: items,
      numberOfItems: items.length,
      total: total,
      formOfPayment: paymentInfo
    };
    Axios.post(
      `${BASE_URL}/restaurants/${props.location.restaurantId.restaurantId}/submitOrder`,
      data,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      }
    ).then(res => console.log(res));
  };

  return (
    <main className="submitOrderScreen">
      <div className="submitOrderInfo">
        <div className="paymentInfo-container">
          <div className="title">
            <h3>Payment Information</h3>
            <p>Change</p>
          </div>
          <span>{cardNumber}</span>
          <span>Exp. Date {paymentInfo.expirationDate}</span>
        </div>
        <div className="deliveryAddress">
          <div className="title">
            <h3>Delivery Address</h3>
            <p>Change</p>
          </div>
          <span>{address.streetAddress}</span>
          <span>
            {address.city}, {address.state} {address.zip}
          </span>
        </div>
      </div>
      <div className="items">
        <button className="backButton">
          <ArrowBackIcon />
        </button>
        <h3>Your Bag</h3>
        {items && items.map(item => <OrderItem itemInfo={item} />)}
        <p style={{ textAlign: "right", padding: "1em" }}>Total: ${total}</p>
        <div className="confirmOrderButtonContainer">
          <button className="submitOrder">Submit Order</button>
        </div>
      </div>
    </main>
  );
};

export default SubmitOrder;
