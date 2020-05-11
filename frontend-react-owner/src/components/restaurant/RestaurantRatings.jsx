import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import "./RestaurantRatings.css";
import Ratings from "react-ratings-declarative";
import { BASE_URL } from "../constants";

const RestaurantRatings = ({ props }) => {
  const [listOfRatings, setListOfRatings] = useState([]);
  useEffect(() => {
    Axios.get(`${BASE_URL}/MyRestaurant/ratings`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => setListOfRatings(res.data));
  }, []);
  return (
    <div className="rating">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {listOfRatings.map((rating) => (
            <tr>
              <td>
                {rating.user.name.firstName} {rating.user.name.lastName}
              </td>
              <td>
                <Ratings
                  rating={rating.rating}
                  widgetRatedColors="gold"
                  widgetDimensions="25px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantRatings;
