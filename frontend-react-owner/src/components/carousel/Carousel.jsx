import React, { useState, useEffect } from "react";

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
    <div>
      <p>Order #: {orderNumber.toUpperCase()}</p>
      <p>Customer: {customer}</p>
      <p>Total: ${total}</p>
      <p>Number of items: {numberOfItems}</p>
      <button onClick={prevOrder}>Prev</button>
      <button onClick={nextOrder}>Next</button>
    </div>
  );
};

export default Carousel;
