import React, { createContext, Component, useContext, useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../constant/constantVariables";

export const ItemContext = createContext();

class ItemContextProvider extends Component {
  state = {
    items: [],
    total: 0,
    addToItems: item => {
      this.setState({ items: [...this.state.items, item] });
      this.setState({ total: this.state.total + item.price });
    },
    removeItem: item => {
      const newItems = this.state.items.filter(itemFromList => {
        return itemFromList !== item;
      });
      this.setState({ items: [...newItems] });
      this.setState({ total: this.state.total - item.price });
    }
  };

  componentDidMount() {
    Axios.get(`${BASE_URL}/users/cart`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    }).then(res => {
      this.setState({ items: res.data.items, total: res.data.total });
    });
  }
  render() {
    return (
      <ItemContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}

export default ItemContextProvider;
