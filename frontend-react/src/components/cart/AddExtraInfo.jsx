import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { JWT_TOKEN, BASE_URL } from "../constant/constantVariables";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const AddExtraInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        name: {
          firstName: firstName,
          lastName: lastName
        },
        cardNumber: cardNumber,
        CSV: csv,
        expirationDate: dateOfExp
      },
      address: {
        streetAddress: streetAddress,
        city: city,
        state: state,
        zip: zip
      }
    };
    Axios.post(`${BASE_URL}/user/addInfo`, data, JWT_TOKEN).then(res =>
      console.log(res)
    );
  };

  return (
    <div>
      <form>
        <TextField
          label="First Name"
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={e => {
            setLastName(e.target.value);
          }}
        />
        <TextField
          label="Street Address"
          value={streetAddress}
          onChange={e => {
            setStreetAddress(e.target.value);
          }}
        />
        <TextField
          label="State"
          value={state}
          onChange={e => {
            setState(e.target.value);
          }}
        />
        <TextField
          label="City"
          value={city}
          onChange={e => {
            setCity(e.target.value);
          }}
        />
        <TextField
          label="Zip"
          value={zip}
          onChange={e => {
            setZip(e.target.value);
          }}
        />
        <TextField
          label="CSV"
          value={csv}
          onChange={e => {
            setCsv(e.target.value);
          }}
        />
        <TextField
          label="Expiration Date"
          value={dateOfExp}
          onChange={e => {
            setDateOfExp(e.target.value);
          }}
        />
        <TextField
          label="Card Number"
          value={cardNumber}
          onChange={e => {
            setCardNumber(e.target.value);
          }}
        />
        <Button onClick={handleSubmit}>Add Info</Button>
      </form>
    </div>
  );
};

export default AddExtraInfo;
