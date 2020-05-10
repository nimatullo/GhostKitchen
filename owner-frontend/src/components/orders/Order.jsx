import React, { useState } from "react";
import NumberFormat from "react-number-format";
import "./Order.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

const Order = ({ order }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <tr
        onClick={() => setOpen(true)}
        className="orderItem"
        key={order.orderNumber}
      >
        <td>
          {order.customerDetails.name.firstName}{" "}
          {order.customerDetails.name.lastName}
        </td>
        <td>{order.orderNumber.toUpperCase()}</td>
        <td>{order.numberOfItems}</td>
        <td>
          <NumberFormat
            fixedDecimalScale={true}
            decimalScale={2}
            displayType={"text"}
            value={order.total}
            prefix={"$"}
          />
        </td>
      </tr>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h2>Customer Order</h2>
          <p>Order #{order.orderNumber.toUpperCase()}</p>
        </DialogTitle>
        <DialogContent>
          <h3>
            Customer: {order.customerDetails.name.firstName}{" "}
            {order.customerDetails.name.lastName}
          </h3>
          <h3>Items</h3>
          <div className="orderItems">
            {order.menuItems.map(item => (
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
            <h3>Total: ${order.total.toFixed(2)}</h3>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Order;
