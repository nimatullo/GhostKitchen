import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./contexts/GlobalContext";

import axios from "axios";

const Home = () => {
  const { auth, baseUrl, jwtToken } = useContext(GlobalContext);
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    if (auth) {
      axios
        .get(`${baseUrl}/user/currentUser`, jwtToken)
        .then(res => res.data.name)
        .then(data => {
          setFirstName(data.firstName);
        });
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth");
    this.props.history.push("/");
  };

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <div>Hello {firstName}!</div>
    </div>
  );
};

export default Home;
