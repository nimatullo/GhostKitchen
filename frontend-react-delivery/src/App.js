import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/delivery/Login";
import Register from "./components/delivery/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalContext } from "./components/contexts/GlobalContext";
import Nav from "./components/nav/Nav";
import AvailableOrders from "./components/orders/AvailableOrders";
import MyDeliveries from "./components/myDeliveries/MyDeliveries";

function App() {
  useEffect(() => {
    document.title = "Ghost Kitchens | Delivery";
  }, []);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [auth, setAuth] = useState(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return true;
    } else {
      return false;
    }
  });
  const value = { setName, auth, setAuth, name };
  return (
    <GlobalContext.Provider value={value}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register" component={() => <Register />} />
          <Route exact path="/available-orders" component={AvailableOrders} />
          <Route exact path="/myDeliveries" component={MyDeliveries} />
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
