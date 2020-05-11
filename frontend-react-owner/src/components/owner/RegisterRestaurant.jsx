import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import Axios from "axios";
import "./RegisterRestaurant.css";
import NumberFormat from "react-number-format";
import { BASE_URL } from "../constants";

const RegisterRestaurant = () => {
  const [restaurantName, setRestaurantName] = useState("");
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
      zip: zip,
    };
    const data = {
      restaurantName: restaurantName,
      address: address,
      menuItems: [],
    };
    Axios.post(`${BASE_URL}/owner/restaurants/add`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          console.log("Cannot be created!");
        }
      })
      .then((data) => {
        history.push("/restaurant/additem");
      });
  };
  return (
    <div className="registerRestaurantForm">
      <form>
        <h2>Register Your Restaurant</h2>
        <TextField
          fullWidth
          variant="outlined"
          label="Restaurant Name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Street Address"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <div className="group">
          <TextField
            fullWidth
            variant="outlined"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FormControl variant="outlined">
            <InputLabel id="stateLabelId">State</InputLabel>
            <Select
              labelId="stateLabelId"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value={"NY"}>NY</MenuItem>
              <MenuItem value={"CA"}>CA</MenuItem>
              <MenuItem value={"NJ"}>NJ</MenuItem>
              <MenuItem value={"PA"}>PA</MenuItem>
              <MenuItem value={"FL"}>FL</MenuItem>
              <MenuItem value={"IL"}>IL</MenuItem>
              <MenuItem value={"VA"}>VA</MenuItem>
              <MenuItem value={"NC"}>NC</MenuItem>
            </Select>
          </FormControl>
          <NumberFormat
            fullWidth
            format="#####"
            customInput={TextField}
            variant="outlined"
            label="Zip"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
        </div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={submitForm}
        >
          Register Restaurant
        </Button>
      </form>
    </div>
  );
};

export default RegisterRestaurant;
