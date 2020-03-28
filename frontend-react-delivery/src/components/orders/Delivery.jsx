import React from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import Axios from "axios";

const Delivery = ({ delivery, setReload, reload }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const acceptDelivery = () => {
    Axios.put(
      `/delivery/${delivery.id}/acceptDelivery`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      }
    ).then(res => {
      setReload(!reload);
      handleClose();
    });
  };
  return (
    <>
      <tr
        onClick={() => setOpen(true)}
        className="deliveryItem"
        key={delivery.order.orderNumber}
      >
        <td>
          {delivery.order.customerDetails.name.firstName}{" "}
          {delivery.order.customerDetails.name.lastName}
        </td>
        <td>{delivery.order.restaurantAddress.streetAddress}</td>
        <td>{delivery.order.customerDetails.address.streetAddress}</td>
        <td>{delivery.order.orderNumber.toUpperCase()}</td>
        <td>{delivery.order.numberOfItems}</td>
        <td>
          <NumberFormat
            fixedDecimalScale={true}
            decimalScale={2}
            displayType={"text"}
            value={delivery.order.total}
            prefix={"$"}
          />
        </td>
      </tr>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Customer Order
          <p>Order #{delivery.order.orderNumber.toUpperCase()}</p>
        </DialogTitle>
        <DialogContent>
          <h3>
            Customer: {delivery.order.customerDetails.name.firstName}{" "}
            {delivery.order.customerDetails.name.lastName}
          </h3>
          <div className="deliveryAddress">
            <h3>Delivery Address</h3>
            <p>{delivery.order.customerDetails.address.streetAddress}</p>
            <p>
              {delivery.order.customerDetails.address.city},{" "}
              {delivery.order.customerDetails.address.state}{" "}
              {delivery.order.customerDetails.address.zip}
            </p>
          </div>
          <h3>Items</h3>
          <div className="orderItems">
            {delivery.order.menuItems.map(item => (
              <div className="orderItemsList">
                <div className="itemName">{item.name}</div>
                <div className="price">
                  <NumberFormat
                    fixedDecimalScale={true}
                    decimalScale={2}
                    displayType={"text"}
                    value={item.price}
                    prefix={"$"}
                  />
                </div>
              </div>
            ))}
            <h3>Total: ${delivery.order.total.toFixed(2)}</h3>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={acceptDelivery}>
            Accept Delivery
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Delivery;
