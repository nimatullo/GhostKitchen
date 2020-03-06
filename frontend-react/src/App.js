import React, { useState } from "react";
import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Home from "./components/Home";
import RestaurantList from "./components/restaurant/RestaurantList";
import Restaurant from "./components/restaurant/Restaurant";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./components/restaurant/AddItem";

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setAuthentication] = useState(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return true;
    } else {
      return false;
    }
  });
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
          <li>
            <Link to="/restaurants/menu/add">Add Item</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          authenticated={isAuthenticated}
          component={() => <Home />}
        />
        <Route exact path="/login">
          <Login setAuth={setAuthentication} />
        </Route>
        <Route exact path="/register" component={() => <Register />} />
        <Route exact path="/restaurants" component={RestaurantList} />
        <Route exact path="/restaurants/:id" component={Restaurant} />
        <Route exact path="/restaurants/menu/add" component={AddItem} />
      </Switch>
    </Router>
  );
}

export default App;
