import React, { createContext, Component } from "react";
import Axios from "axios";
import { BASE_URL } from "../constant/constantVariables";

export const ItemContext = createContext();

class ItemContextProvider extends Component {
  state = {
    items: [],
    total: 0,
    updateContext: () => {
      Axios.get(`${BASE_URL}/users/cart`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      }).then((res) => {
        this.setState({ items: res.data.items, total: res.data.total });
      });
    },
  };

  componentDidMount() {
    this.state.updateContext();
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
