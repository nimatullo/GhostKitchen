import React from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button, Link } from "@material-ui/core";
import useForm from "../useForm";
import validate from "../validateRegister";
import { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const history = useHistory();
  const { handleChange, handleSubmit, values, errors } = useForm(
    register,
    validate
  );
  const [serverError, setServerError] = useState("");

  function register() {
    axios
      .post("/delivery/register", {
        email: values.email,
        password: values.password,
        name: {
          firstName: values.firstName,
          lastName: values.lastName
        }
      })
      .then(res => {
        if (res.status === 201) {
          history.push("/owner/register/restaurants");
        } else {
          return res.statusText;
        }
      })
      .then(responseMessage => {
        setServerError(responseMessage);
      });
  }
  if (localStorage.getItem("auth") === "true") {
    history.push("/");
  }
  return (
    <div className="registerForm">
      <form>
        <div className="firstRow">
          <h3>Create your account</h3>
          <div className="name">
            <TextField
              variant="outlined"
              label="First Name"
              name="firstName"
              type="text"
              onChange={handleChange}
              value={values.firstName}
              helperText={errors.firstName && errors.firstName}
            />
            <TextField
              variant="outlined"
              label="Last Name"
              name="lastName"
              type="text"
              onChange={handleChange}
              value={values.lastName}
              helperText={errors.lastName && errors.lastName}
            />
          </div>
        </div>
        <div>
          <TextField
            variant="outlined"
            fullWidth
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
            variant="outlined"
            fullWidth
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            helperText={errors.password && errors.password}
          />
        </div>
        <div className="submitButton">
          <Button
            fullWidth
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </div>
        <div>
          <p>{serverError}</p>
        </div>
      </form>
      <p>
        Have an account? <Link href="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
