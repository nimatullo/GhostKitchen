import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import Axios from "axios";

const AddressChange = ({ address, setAddress }) => {
  const [open, setOpen] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const data = {
      streetAddress: streetAddress,
      city: city,
      state: state,
      zip: zip
    };
    Axios.put("http://localhost:3001/user/updateAddress", data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    }).then(res => {
      if (res.status === 200) {
        setOpen(false);
        setAddress(data);
      }
    });
  };
  return (
    <>
      <div className="title">
        <h3>Delivery Address</h3>
        <p onClick={e => setOpen(true)}>Change</p>
      </div>
      <span>{address.streetAddress}</span>
      <span>
        {address.city}, {address.state} {address.zip}
      </span>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Update Delivery Address</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              value={streetAddress}
              onChange={e => setStreetAddress(e.target.value)}
              label="Street Address"
              fullWidth
            />
            <TextField
              value={city}
              onChange={e => setCity(e.target.value)}
              label="City"
              fullWidth
            />
            <TextField
              value={state}
              onChange={e => setState(e.target.value)}
              label="State"
            />
            <NumberFormat
              customInput={TextField}
              format="#####"
              value={zip}
              onChange={e => setZip(e.target.value)}
              label="Zip Code"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddressChange;
