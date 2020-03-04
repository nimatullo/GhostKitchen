import React, { Component } from "react";
import axios from "axios";
import RestaurantListing from "./RestaurantListing";
import {
  Card,
  Typography,
  CardContent,
  CardActionArea
} from "@material-ui/core";
import Address from "./Address";

class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurantList: [] };
  }
  componentDidMount() {
    axios
      .get("/restaurants/all", {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      })
      .then(response => response.data)
      .then(data => this.setState({ restaurantList: data }));
  }

  handleClick(restaurantId) {
    this.props.history.push(`/restaurants/${restaurantId}`);
  }

  render() {
    return (
      <div>
        {this.state.restaurantList.map(restaurant => (
          <Card
            key={restaurant.id}
            style={{ "max-width": "500px", margin: "1em" }}
          >
            <CardActionArea onClick={() => this.handleClick(restaurant.id)}>
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
  }
}

export default RestaurantList;
