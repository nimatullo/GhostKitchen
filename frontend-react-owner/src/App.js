import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/owner/Login";
import Register from "./components/owner/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GlobalContext } from "./components/contexts/GlobalContext";
import Nav from "./components/nav/Nav";
import Restaurant from "./components/restaurant/Restaurant";
import RegisterRestaurant from "./components/owner/RegisterRestaurant";
import Axios from "axios";
import AddItem from "./components/owner/AddItem";

function App() {
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
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;