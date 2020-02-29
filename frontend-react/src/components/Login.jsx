import React from "react";
import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import validate from "./validateLogin";
import useForm from "./useForm";
import { useHistory } from "react-router-dom";

export default function Login({ setAuth }) {
  const { handleChange, handleSubmit, values, errors } = useForm(
    logIn,
    validate
  );
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  function logIn() {
    const credentials = {
      email: values.email,
      password: values.password
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    };
    fetch("/login", options)
      .then(response => {
        if (response.ok) {
          setAuth(true);
          return response.json();
        } else {
          setErrorMsg("Email or password is incorrect.");
        }
      })
      .then(data => {
        history.push("/");
      });
  }

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
