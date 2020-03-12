import React, { useContext, useState, useEffect } from "react";
import { ItemContext } from "../contexts/ItemContext";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";
import Axios from "axios";
import AddExtraInfo from "./AddExtraInfo";
import { Button } from "@material-ui/core";

const SubmitOrder = props => {
  const [items, setItems] = useState(props.location.items);
  const [total, setTotal] = useState(props.location.total);
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    Axios.get(`${BASE_URL}/users/cart`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    }).then(res => {
      setItems(res.data.items);
      setTotal(res.data.total);
    });
  }, []);

  useEffect(() => {
    Axios.get(`${BASE_URL}/user/paymentInfo`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    }).then(res => {
      setPaymentInfo(res.data);
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
      JWT_TOKEN
    ).then(res => console.log(res));
  };

  return (
    <div>
      <pre>{JSON.stringify(items)}</pre>
      {/* <AddExtraInfo /> */}
      <pre>{JSON.stringify(paymentInfo, null, 4)}</pre>
      <form>
        <Button onClick={confirmOrder}>Confirm Order</Button>
      </form>
    </div>
  );
};

export default SubmitOrder;
