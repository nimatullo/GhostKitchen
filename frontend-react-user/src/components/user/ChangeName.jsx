import React from "react";
import { Link } from "@material-ui/core";

const ChangeName = ({ firstName, lastName }) => {
  return (
    <div className="row">
      <div className="details">
        <small>Name</small>
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <Link to="#">Edit</Link>
    </div>
  );
};

export default ChangeName;
