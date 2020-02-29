import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserContext } from "./components/UserContext";

function App() {
  const [user, setUser] = useState({});
  const [isAuthenticated, setAuthentication] = useState(false);
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
      </Switch>
    </Router>
  );
}

export default App;
