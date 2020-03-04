import React from "react";
import Address from "./Address";

const RestaurantListing = ({ restaurantInfo }) => {
  return (
    <div>
      <h1>{restaurantInfo.name}</h1>
      <Address address={restaurantInfo.address} />
      <p>
        {restaurantInfo.name.firstName} {restaurantInfo.name.lastName}
      </p>
    </div>
  );
};

export default RestaurantListing;
