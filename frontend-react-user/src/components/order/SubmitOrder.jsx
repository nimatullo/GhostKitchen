import React, { useContext, useState, useEffect } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";
import Axios from "axios";
import "./SubmitOrder.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import OrderItem from "./OrderItem";
import NumberFormat from "react-number-format";
import AddressChange from "./AddressChange";
import PaymentChange from "./PaymentChange";
import { TextField } from "@material-ui/core";
import AddExtraInfo from "./AddExtraInfo";

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
      console.log(res);
      if (res.data.payment && res.data.address) {
        setCardNumber(
          "**** **** **** " +
            res.data.payment.cardNumber.substring(
              res.data.payment.cardNumber.length - 4
            )
        );
        setPaymentPresent(true);
        setPaymentInfo(res.data.payment);
        setAddress(res.data.address);
      }
    });
  }, [paymentPresent]);

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

  const present = () => {
    if (paymentPresent) {
      return (
        <div className="submitOrderInfo">
          <div className="paymentInfo-container">
            <PaymentChange
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              setPaymentInfo={setPaymentInfo}
              paymentInfo={paymentInfo}
            />
          </div>
          <div className="deliveryAddress">
            <AddressChange setAddress={setAddress} address={address} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="submitOrderInfo">
          <div className="extraInfoForm">
            <AddExtraInfo setPaymentPresent={setPaymentPresent} />
          </div>
        </div>
      );
    }
  };

  return (
    <main className="submitOrderScreen">
      {present()}
      <div className="items">
        <button className="backButton">
          <ArrowBackIcon />
        </button>
        <h3>Your Bag</h3>
        {items && items.map(item => <OrderItem itemInfo={item} />)}
        <p style={{ textAlign: "right", padding: "1em" }}>Total: ${total}</p>
        <div className="confirmOrderButtonContainer">
          <button onClick={confirmOrder} className="submitOrder">
            Submit Order
          </button>
        </div>
      </div>
    </main>
  );
};

export default SubmitOrder;
