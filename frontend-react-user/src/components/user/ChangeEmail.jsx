import React from "react";
import { Link, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { BASE_URL } from "../constant/constantVariables";
import Axios from "axios";

const ChangeEmail = ({ email, setEmail }) => {
  const [showForm, setShowForm] = useState(false);
  const [newEmail, setNewEmail] = useState();
  const handleSubmit = () => {
    Axios.put(
      `${BASE_URL}/user/change/email`,
      {
        email: newEmail,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }
    ).then((res) => {
      setEmail(newEmail);
      setShowForm(false);
    });
  };

  return (
    <div className="row">
      {showForm ? (
        <div className="changesForm">
          <TextField
            margin="dense"
            label="Email"
            variant={"outlined"}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            size="small"
            margin="dense"
            variant="contained"
          >
            Confirm Account Changes
          </Button>
          <Button
            onClick={() => {
              setEmail(email);
              setShowForm(false);
            }}
            size="small"
            margin="dense"
          >
            Cancel Changes
          </Button>
        </div>
      ) : (
        <>
          <div className="details">
            <small>Email</small>
            <p>{email}</p>
          </div>
          <Link onClick={() => setShowForm(true)}>Edit</Link>
        </>
      )}
    </div>
  );
};

export default ChangeEmail;
