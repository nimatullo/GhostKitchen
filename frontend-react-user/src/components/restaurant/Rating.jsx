import React, { useState } from "react";
import Ratings from "react-ratings-declarative/build/ratings";
import { useEffect } from "react";
import Axios from "axios";
import { BASE_URL } from "../constant/constantVariables";

const Rating = ({ restaurantId, rating, changeRating }) => {
  const [rated, setRated] = useState(false);
  useEffect(() => {
    Axios.get(`${BASE_URL}/restaurants/${restaurantId}/rated`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    }).then(res => setRated(res.data.success));
  }, []);

  if (!rated) {
    return (
      <Ratings
        rating={rating}
        widgetDimensions="20px"
        widgetRatedColors="gold"
        changeRating={changeRating}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    );
  } else {
    return (
      <Ratings rating={rating} widgetDimensions="20px" widgetRatedColors="gold">
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    );
  }
};

export default Rating;
