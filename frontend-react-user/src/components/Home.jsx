import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./contexts/GlobalContext";
import { JWT_TOKEN, BASE_URL } from "./constant";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { auth, setName, name } = useContext(GlobalContext);
  const history = useHistory();
  useEffect(() => {
    if (auth) {
      axios
        .get(`${BASE_URL}/currentUser`, {
          headers: {
            Authentication: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((res) => res.data.name)
        .then((data) => {
          setName(data.firstName);
        });
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth");
    setName("");
    history.push("/login");
  };

  return (
    <div>
      <h3>Hello {name}!</h3>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Home;
