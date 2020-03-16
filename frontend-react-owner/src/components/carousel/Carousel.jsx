import React, { useState, useEffect } from "react";
import "./Carousel.css";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Carousel = ({ orders }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [customer, setCustomer] = useState("");
  const [total, setTotal] = useState("");
  const [numberOfItems, setNumberOfItems] = useState("");
  const [index, setIndex] = useState(1);

  useEffect(() => {
    setDisplay();
  }, [index]);

  const setDisplay = () => {
    const order = orders[index];
    setOrderNumber(order.orderNumber);
    setCustomer(order.user.name.firstName + " " + order.user.name.lastName);
    setTotal(order.total.toFixed(2));
    setNumberOfItems(order.numberOfItems);
  };

  const nextOrder = () => {
    console.log(index);
    if (index === orders.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const prevOrder = () => {
    console.log(index);
    if (index === 0) {
      setIndex(orders.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div className="pastOrders-container">
      <button onClick={prevOrder}>
        <ChevronLeftIcon />
      </button>
      <div className="carousel-info">
        <p>Order #: {orderNumber.toUpperCase()}</p>
        <p>Customer: {customer}</p>
        <p>Total: ${total}</p>
        <p>Number of items: {numberOfItems}</p>
      </div>
      <button onClick={nextOrder}>
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Carousel;
