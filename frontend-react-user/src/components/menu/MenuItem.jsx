import React, { useContext, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { ItemContext } from "../contexts/ItemContext";
import Alert from "../Alert";
import Axios from "axios";
import { BASE_URL } from "../constant/constantVariables";
import "./MenuItem.css";

const MenuItem = ({ menuItem }) => {
  const { updateContext } = useContext(ItemContext);
  const [open, setOpen] = useState(false);
  const handleClick = (id) => {
    Axios.post(
      `${BASE_URL}/users/cart/add/${id}`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }
    ).then((res) => {
      updateContext();
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    });
  };

  return (
    <div className="menuItem" onClick={() => handleClick(menuItem.id)}>
      <img className="itemImg" src={menuItem.urlPath} alt={menuItem.name} />
      <div className="itemInfo">
        <div class="name-price">
          <h2>{menuItem.name}</h2>
          <h3>${menuItem.price.toFixed(2)}</h3>
        </div>
        <div className="description-container">
          <p>{menuItem.description}</p>
        </div>
      </div>
      <Snackbar open={open}>
        <Alert severity="success">Item added</Alert>
      </Snackbar>
    </div>
  );
};

export default MenuItem;
