import React, { createContext, Component, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Axios from "axios";

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

  getJwt() {
    const { jwtToken } = useContext(GlobalContext);
    return jwtToken;
  }

  getBaseUrl() {
    const { BASE_URL } = useContext(GlobalContext);
    return BASE_URL;
  }

  componentDidMount() {
    Axios.get(`${this.getBaseUrl}/cart`, this.getJwt).then(res => {
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
