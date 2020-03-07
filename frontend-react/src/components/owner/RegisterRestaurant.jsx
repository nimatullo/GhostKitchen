import React, { useState, useContext } from "react";
import { TextField, Select, MenuItem, Button } from "@material-ui/core";
import { RestaurantContext } from "../contexts/RestaurantCreationContext";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

const RegisterRestaurant = () => {
  const { restaurantName, setRestaurantName, setAddress } = useContext(
    RestaurantContext
  );
  const { jwtToken, baseUrl } = useContext(GlobalContext);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const history = useHistory();

  const submitForm = () => {
    const address = {
      streetAddress: streetAddress,
      city: city,
      state: state,
      zip: zip
    };
    setAddress(address);
    const data = {
      restaurantName: restaurantName,
      address: address,
      menuItems: []
    };
    Axios.post(`${baseUrl}/owner/restaurants/add`, data, jwtToken).then(
      history.push("/restaurants/menu/add")
    );
  };

  return (
    <div>
      <form>
        <div>
          <TextField
            label="Restaurant Name"
            value={restaurantName}
            onChange={e => setRestaurantName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Street Address"
            value={streetAddress}
            onChange={e => setStreetAddress(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="City"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </div>
        <div>
          <Select value={state} onChange={e => setState(e.target.value)}>
            <MenuItem value={"NY"}>NY</MenuItem>
            <MenuItem value={"CA"}>CA</MenuItem>
            <MenuItem value={"NJ"}>NJ</MenuItem>
            <MenuItem value={"PA"}>PA</MenuItem>
            <MenuItem value={"FL"}>FL</MenuItem>
            <MenuItem value={"IL"}>IL</MenuItem>
            <MenuItem value={"VA"}>VA</MenuItem>
            <MenuItem value={"NC"}>NC</MenuItem>
          </Select>
        </div>
        <div>
          <TextField
            label="Zip Code"
            value={zip}
            onChange={e => setZip(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={submitForm}>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterRestaurant;
