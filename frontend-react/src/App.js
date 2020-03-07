import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Login from "./components/user/UserLogin";
import Register from "./components/user/UserRegister";
import Home from "./components/Home";
import RestaurantList from "./components/restaurant/RestaurantList";
import Restaurant from "./components/restaurant/Restaurant";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./components/restaurant/AddItem";
import OwnerRegister from "./components/owner/OwnerRegister";
import OwnerLogin from "./components/owner/OwnerLogin";
import RegisterRestaurant from "./components/owner/RegisterRestaurant";
import RestaurantCreationProvider from "./components/contexts/RestaurantCreationContext";
import { GlobalContext } from "./components/contexts/GlobalContext";

function App() {
  const [auth, setAuth] = useState(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return true;
    } else {
      return false;
    }
  });
  const value = { auth, setAuth };
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/restaurants">Restaurants</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <GlobalContext.Provider value={value}>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register" component={() => <Register />} />
          <Route exact path="/restaurants" component={RestaurantList} />
          <Route exact path="/restaurants/:id" component={Restaurant} />
          <Route exact path="/owner/register" component={OwnerRegister} />
          <RestaurantCreationProvider>
            <Route exact path="/restaurants/menu/add" component={AddItem} />
            <Route exact path="/owner/login">
              <OwnerLogin />
            </Route>
            <Route
              exact
              path="/owner/register/restaurants"
              component={RegisterRestaurant}
            />
          </RestaurantCreationProvider>
        </GlobalContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
