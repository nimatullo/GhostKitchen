import React from "react";
import { Typography } from "@material-ui/core";

const Address = ({ address }) => {
  return (
    <div>
      <Typography color="textSecondary" component="p">
        {address.streetAddress}
      </Typography>
      <Typography color="textSecondary" component="p">
        {address.city}, {address.state}
      </Typography>
      <Typography color="textSecondary" component="p">
        {address.zip}
      </Typography>
    </div>
  );
};

export default Address;
