import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "./contexts/GlobalContext";
import { JWT_TOKEN, BASE_URL } from "./constant/constantVariables";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { auth } = useContext(GlobalContext);
  const [firstName, setFirstName] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (auth) {
      axios
        .get(`${BASE_URL}/user/currentUser`, JWT_TOKEN)
        .then(res => res.data.name)
        .then(data => {
          setFirstName(data.firstName);
        });
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth");
    history.push("/login");
  };

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <div>Hello {firstName}!</div>
    </div>
  );
};

export default Home;
