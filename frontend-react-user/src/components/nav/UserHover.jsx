import React, { useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useHistory, NavLink } from "react-router-dom";
import "./UserHover.css";
import { Divider, Link } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const UserHover = () => {
  const { name, setName } = useContext(GlobalContext);
  const [hovered, setHovered] = useState(false);
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth");
    localStorage.removeItem("name");
    setName("");
    history.push("/login");
  };

  const menu = () => {
    if (hovered) {
      return (
        <div className="hoverMenu">
          <div className="nav-link">User Settings</div>
          <Divider />
          <div className="nav-link">
            <a href="/pastOrders">Past Orders</a>
          </div>
          <Divider />
          <div className="nav-link" onClick={logOut}>
            Log Out
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => {
        setTimeout(() => setHovered(false));
      }}
    >
      <div className="welcome nav-link">
        Welcome {name}! <ArrowDropDownIcon />
      </div>
      {menu()}
    </div>
  );
};

export default UserHover;
