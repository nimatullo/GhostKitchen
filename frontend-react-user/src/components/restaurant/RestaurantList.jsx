import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import Address from "./Address";
import { GlobalContext } from "../contexts/GlobalContext";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../constant";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const { jwtToken, serverError } = useContext(GlobalContext);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/restaurants/all`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((response) => response.data)
      .then((data) => setRestaurantList(data))
      .catch((err) => console.log(err.response));
  }, [jwtToken]);

  const handleClick = (restaurantId) => {
    history.push(`/restaurants/${restaurantId}`);
  };

  if (serverError) {
    history.push("/server-error");
  }

  return (
    <div>
      {restaurantList.map((restaurant) => (
        <Card key={restaurant.id} style={{ maxWidth: "500px", margin: "1em" }}>
          <CardActionArea onClick={() => handleClick(restaurant.id)}>
            <CardContent>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
                component="h2"
              >
                {restaurant.name}
              </Typography>
              <Address address={restaurant.address} />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantList;
