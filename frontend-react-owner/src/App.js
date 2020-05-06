import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/owner/Login";
import Register from "./components/owner/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalContext } from "./components/contexts/GlobalContext";
import Nav from "./components/nav/Nav";
import Restaurant from "./components/restaurant/Restaurant";
import RegisterRestaurant from "./components/owner/RegisterRestaurant";
import OrderBeakdown from "./components/orders/OrderBreakdown";
import AddItem from "./components/owner/AddItem";
import RestaurantRatings from "./components/restaurant/RestaurantRatings";
import UserBreakdown from "./components/restaurant/UserBreakdown";

function App() {
  useEffect(() => {
    document.title = "Ghost Kitchen | Owner";
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
          <Route exact path="/myrestaurant" component={Restaurant} />
          <Route
            exact
            path="/register/restaurant"
            component={RegisterRestaurant}
          />
          <Route exact path="/restaurant/additem" component={AddItem} />
          <Route exact path="/orders" component={OrderBeakdown} />
          <Route
            exact
            path="/myrestaurant/ratings"
            component={RestaurantRatings}
          />
          <Route
            exact
            path="/myrestaurant/customers"
            component={UserBreakdown}
          />
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
