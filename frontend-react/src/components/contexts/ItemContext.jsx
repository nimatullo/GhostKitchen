import React, { createContext, Component } from "react";
import Axios from "axios";

export const ItemContext = createContext();

class ItemContextProvider extends Component {
  state = {
    items: [],
    total: 0,
    jwtToken: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    },
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
    Axios.get("/cart/", this.state.jwtToken).then(res => {
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
