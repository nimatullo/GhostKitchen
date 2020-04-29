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
import { TextField, Divider } from "@material-ui/core";
import AddExtraInfo from "./AddExtraInfo";
import { useHistory } from "react-router-dom";

const SubmitOrder = (props) => {
  const [items, setItems] = useState();
  const [total, setTotal] = useState();
  const [subtotal, setSubTotal] = useState(0);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [paymentPresent, setPaymentPresent] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [address, setAddress] = useState({});
  const [tax, setTax] = useState(0);
  const history = useHistory();

  useEffect(() => {
    Axios.get(`${BASE_URL}/users/cart`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    })
      .then((res) => {
        setSubTotal(res.data.total);
        setTotalCalucaltion(res.data.total);
        return res.data;
      })
      .then((data) => {
        setItems(data.items);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${BASE_URL}/user/paymentInfo`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    }).then((res) => {
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

  const setTotalCalucaltion = (subtotal) => {
    setTax((subtotal * 0.08).toFixed(2));
    setTotal((subtotal * 1.08 + 3.0).toFixed(2));
  };

  const confirmOrder = () => {
    const data = {
      items: items,
      numberOfItems: items.length,
      total: total,
      formOfPayment: paymentInfo,
    };
    Axios.post(
      `${BASE_URL}/restaurants/${props.location.restaurantId.restaurantId}/submitOrder`,
      data,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }
    ).then((res) => {
      if (res.status === 200) {
        history.push(`/orders/${res.data.orderNumber}`);
      }
    });
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
        <button className="backButton" onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </button>
        <h3>Your Bag</h3>
        {items && items.map((item) => <OrderItem itemInfo={item} />)}
        <div className="totalCalculation">
          <div className="text">
            <span>Subtotal</span>
            <span>Service Fee</span>
            <span>Tax</span>
            <span className="total">Total</span>
          </div>
          <div className="amount">
            <span>${subtotal}</span>
            <span>$3.00</span>
            <span>${tax}</span>
            <span className="total">${total}</span>
          </div>
        </div>
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
