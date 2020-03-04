import React, { useState, useEffect } from "react";
import Axios from "axios";
import MenuItem from "../menu/MenuItem";

const Restaurant = ({
  match: {
    params: { id }
  }
}) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    Axios.get(`/restaurants/${id}/menu`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    })
      .then(res => res.data)
      .then(data => setMenu(data.menuItems));
  }, []);

  return (
    <div>
      {menu.map(menuItemInfo => (
        <MenuItem menuItem={menuItemInfo} />
      ))}
    </div>
  );
};

export default Restaurant;
