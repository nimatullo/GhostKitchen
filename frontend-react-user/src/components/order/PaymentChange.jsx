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
import { BASE_URL } from "../constant/constantVariables";

const PaymentChange = ({
  setPaymentInfo,
  paymentInfo,
  cardNumber,
  setCardNumber
}) => {
  const [cardHolder, setCardHolder] = useState({
    firstName: "",
    lastName: ""
  });
  const [open, setOpen] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [dateOfExpiration, setDateOfExpiration] = useState("");
  const [csv, setCsv] = useState("");

  const handleCancel = () => {
    setOpen(false);
  };

  const saveChanges = () => {
    Axios.put(
      `http://localhost:3001/user/updatePayment`,
      {
        name: cardHolder,
        cardNumber: creditCardNumber,
        expirationDate: dateOfExpiration,
        csv: csv
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      }
    ).then(res => {
      if (res.status === 200) {
        setCardNumber(
          "**** **** **** " +
            creditCardNumber.substring(creditCardNumber.length - 4)
        );
        setPaymentInfo({ expirationDate: dateOfExpiration });
        setOpen(false);
      }
    });
  };

  return (
    <>
      <div className="title">
        <h3>Payment Information</h3>
        <p onClick={() => setOpen(true)}>Change</p>
      </div>
      <span>{cardNumber}</span>
      <span>Exp. Date {paymentInfo.expirationDate}</span>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Update Payment</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="First Name"
              value={cardHolder.firstName}
              onChange={e =>
                setCardHolder({
                  firstName: e.target.value,
                  lastName: cardHolder.lastName
                })
              }
            />
            <TextField
              label="Last Name"
              value={cardHolder.lastName}
              onChange={e =>
                setCardHolder({
                  firstName: cardHolder.firstName,
                  lastName: e.target.value
                })
              }
            />
            <NumberFormat
              customInput={TextField}
              format="#### #### #### ####"
              label="Credit Card Number"
              value={creditCardNumber}
              fullWidth
              onChange={e => setCreditCardNumber(e.target.value)}
            />
            <NumberFormat
              value={dateOfExpiration}
              customInput={TextField}
              label="Date of Expiration"
              placeholder="MM/YYYY"
              format="##/####"
              mask={["M", "M", "Y", "Y", "Y", "Y"]}
              onChange={e => setDateOfExpiration(e.target.value)}
            />
            <NumberFormat
              value={csv}
              customInput={TextField}
              label="CSV"
              format="###"
              onChange={e => setCsv(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentChange;
