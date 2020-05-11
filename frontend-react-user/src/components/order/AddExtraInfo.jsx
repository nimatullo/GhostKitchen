import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import { JWT_TOKEN, BASE_URL } from "../constant";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "./AddExtraInfo.css";
import NumberFormat from "react-number-format";

const AddExtraInfo = ({ setPaymentPresent }) => {
  const [holderName, setHolderName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [csv, setCsv] = useState("");
  const [dateOfExp, setDateOfExp] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    const data = {
      details: {
        cardHolderName: holderName,
        cardNumber: cardNumber,
        CSV: csv,
        expirationDate: dateOfExp,
      },
      userAddress: {
        streetAddress: streetAddress,
        city: city,
        state: state,
        zip: zip,
      },
    };
    Axios.post(`${BASE_URL}/user/addInfo`, data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    }).then((res) => setPaymentPresent(true));
  };

  return (
    <div className="extraInfoForm">
      <form>
        <div className="addressForm">
          <h3>Delivery Address</h3>
          <TextField
            required={true}
            classes={{ root: "TextField" }}
            label="Street Address"
            value={streetAddress}
            onChange={(e) => {
              setStreetAddress(e.target.value);
            }}
            fullWidth
          />
          <TextField
            classes={{ root: "TextField" }}
            className="cityField"
            label="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            fullWidth
          />
          <div className="group">
            <TextField
              label="State"
              classes={{ root: "TextField" }}
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
            <TextField
              label="Zip"
              classes={{ root: "TextField" }}
              value={zip}
              onChange={(e) => {
                setZip(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="paymentForm">
          <h3>Payment Information</h3>
          <NumberFormat
            format="#### #### #### ####"
            customInput={TextField}
            classes={{ root: "TextField" }}
            label="Enter Credit Card Number"
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
            fullWidth
          />
          <TextField
            label="Card Holder"
            classes={{ root: "TextField" }}
            value={holderName}
            onChange={(e) => {
              setHolderName(e.target.value);
            }}
            fullWidth
          />
          <div className="group">
            <TextField
              classes={{ root: "TextField" }}
              label="CSV"
              value={csv}
              onChange={(e) => {
                setCsv(e.target.value);
              }}
            />
            <TextField
              classes={{ root: "TextField" }}
              label="Expiration Date"
              value={dateOfExp}
              onChange={(e) => {
                setDateOfExp(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="submit">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Info
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExtraInfo;
