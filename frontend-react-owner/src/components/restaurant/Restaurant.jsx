import React, { useEffect } from "react";
import Axios from "axios";

const Restaurant = () => {
  const jwtToken = {};
  useEffect(() => {
    const auth = { Authentication: "Bearer " + localStorage.getItem("jwt") };
    console.log(auth);
    fetch("/MyRestaurant", {
      method: "GET",
      headers: auth
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return <div></div>;
};

export default Restaurant;
