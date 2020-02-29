import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setAuthentication] = useState(false);
  const [account, setAccount] = useState({ firstName: "", lastName: "" });
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
          component={() => <Home user={account} />}
        />
        <Route exact path="/login">
          <Login setAuth={setAuthentication} currentUser={setAccount} />
        </Route>
        <ProtectedRoute
          exact
          path="/register"
          authenticated={isAuthenticated}
          component={() => <Register />}
        />
      </Switch>
    </Router>
  );
}

export default App;
