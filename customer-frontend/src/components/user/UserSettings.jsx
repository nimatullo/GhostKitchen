import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../constant/constantVariables";
import Axios from "axios";
import "./UserSettings.css";
import ChangeName from "./ChangeName";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";

const UserSettings = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    Axios.get(`${BASE_URL}/currentUser`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
    }).then((res) => {
      setEmail(res.data.email);
      setFirstName(res.data.name.firstName);
      setLastName(res.data.name.lastName);
    });
  }, []);
  return (
    <div className="setting">
      <div className="setting-content">
        <h3>Your Account</h3>
        <ChangeName firstName={firstName} lastName={lastName} />
        <ChangeEmail email={email} setEmail={setEmail} />
        <ChangePassword />
      </div>
    </div>
  );
};

export default UserSettings;
