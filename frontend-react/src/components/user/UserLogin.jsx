import React from "react";
import { useState, useContext } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import validate from "../validateLogin";
import useForm from "../useForm";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";

export default function Login() {
  const { setAuth, setName, setJwtToken } = useContext(GlobalContext);
  const [isLoading, setLoading] = useState(false);
  const { handleChange, handleSubmit, values, errors } = useForm(
    logIn,
    validate
  );
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  function logIn() {
    setLoading(true);
    axios
      .put("user/login", {
        email: values.email,
        password: values.password
      })
      .then(res => {
        if (res.status === 200) {
          setAuth(true);
          setName(res.data.firstName);
          setJwtToken(res.data.accessToken);
          localStorage.setItem("auth", true);
          localStorage.setItem("jwt", res.data.accessToken);
          localStorage.setItem("name", res.data.firstName);
          history.push("/");
        } else {
          setErrorMsg("Email or password is incorrect.");
        }
      });
  }

  // Redirect to Home Page if user is already logged in.
  if (localStorage.getItem("auth") === "true") {
    history.push("/");
  }
  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div>
        <form>
          <div>
            <TextField
              name="email"
              type="email"
              label="Email Address"
              value={values.email}
              onChange={handleChange}
              helperText={errors.email && errors.email}
            />
          </div>
          <div>
            <TextField
              name="password"
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              helperText={errors.password && errors.password}
            />
          </div>
          <Button onClick={handleSubmit}>Log In</Button>
        </form>
        <p>{errorMsg}</p>
      </div>
    );
  }
}
