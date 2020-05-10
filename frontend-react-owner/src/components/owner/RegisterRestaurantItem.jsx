import React from "react";

const RegisterRestaurantItem = ({ item }) => {
  return (
    <li>
      <p>{item.name}</p>
      <p>${item.price.toFixed(2)}</p>
    </li>
  );
};

export default RegisterRestaurantItem;
