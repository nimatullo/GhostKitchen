import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import useForm from "./useForm";
import validate from "./validateRegister";
import { useState } from "react";

const Register = () => {
  const history = useHistory();
  const { handleChange, handleSubmit, values, errors } = useForm(
    register,
    validate
  );
  const [serverError, setServerError] = useState("");

  function register() {
    const data = {
      email: values.email,
      password: values.password,
      name: {
        firstName: values.firstName,
        lastName: values.lastName
      }
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("/register", options)
      .then(response => {
        if (response.ok) {
          history.push("/");
        } else {
          return response.text();
        }
      })
      .then(responseMessage => {
        setServerError(responseMessage);
      });
  }
  return (
    <div className="registerForm">
      <form>
        <div>
          <TextField
            label="First Name"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={values.firstName}
            helperText={errors.firstName && errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={values.lastName}
            helperText={errors.lastName && errors.lastName}
          />
        </div>
        <div>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            helperText={errors.email && errors.email}
          />
        </div>
        <div>
          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            helperText={errors.password && errors.password}
          />
        </div>
        <div>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Register
          </Button>
        </div>
        <div>
          <p>{serverError}</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
