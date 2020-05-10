import React, { createContext, Component } from "react";

export const RestaurantContext = createContext();

class RestaurantContextProvider extends Component {
  state = {
    items: [],
    address: {
      streetAddress: "",
      zip: "",
      state: ""
    },
    restaurantName: "",
    addToItems: item => {
      this.setState({ items: [...this.state.items, item] });
    },
    setRestaurantName: name => {
      this.setState({ restaurantName: name });
    },
    setAddress: address => {
      this.setState({ address: address });
    }
  };

  render() {
    return (
      <RestaurantContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </RestaurantContext.Provider>
    );
  }
}

export default RestaurantContextProvider;
