import React from "react";
import Axios from "axios";
import { useEffect } from "react";

const PastOrders = () => {
  useEffect(() => {
    Axios.get("/user/pastOrders", {
      headers: {
        Authentication: "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => console.log(res));
  }, []);
  return <div>PastOrders!</div>;
};

export default PastOrders;
