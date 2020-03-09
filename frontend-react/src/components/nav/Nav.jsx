import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "./vectors/logo.svg";
import { GlobalContext } from "../contexts/GlobalContext";
import UserHover from "./UserHover";

const Nav = () => {
  const { name } = useContext(GlobalContext);
  const history = useHistory();
  const user = () => {
    if (name) {
      return <UserHover />;
    } else {
      return (
        <div>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </div>
      );
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <img src={logo} alt="Ghost Kitchen" />
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/restaurants">Restaurants</Link>
        </li>
        {user()}
      </ul>
    </nav>
  );
};

export default Nav;
