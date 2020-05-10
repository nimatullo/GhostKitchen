import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/user/UserLogin";
import Register from "./components/user/UserRegister";
import RestaurantList from "./components/restaurant/RestaurantList";
import Restaurant from "./components/restaurant/Restaurant";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ServerError from "./components/ServerError.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { GlobalContext } from "./components/contexts/GlobalContext";
import AddExtraInfo from "./components/order/AddExtraInfo";
import SubmitOrder from "./components/order/SubmitOrder";
import Nav from "./components/nav/Nav";
import PastOrders from "./components/pastOrders/PastOrders.jsx";
import OrderConfirmation from "./components/order/OrderConfirmation";
import UserSettings from "./components/user/UserSettings";
import Axios from "axios";

function App() {
  useEffect(() => {
    Axios.get("/currentUser", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(() => setServerError(false))
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("jwt");
          localStorage.removeItem("auth");
          localStorage.removeItem("name");
          setName("");
          return <Redirect to="/login" />;
        } else if (err.response.status === 500) {
          setServerError(true);
          return <Redirect to="/server-error" />;
        }
      });
  }, []);
  const [serverError, setServerError] = useState(false);
  const [jwtToken, setJwtToken] = useState({});
  const [name, setName] = useState(localStorage.getItem("name"));
  const [auth, setAuth] = useState(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return true;
    } else {
      return false;
    }
  });
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setJwtToken({
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    }
  }, []);
  const value = {
    setName,
    auth,
    setAuth,
    name,
    setJwtToken,
    jwtToken,
    serverError,
  };
  return (
    <GlobalContext.Provider value={value}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/server-error" component={ServerError} />
          <Route exact path="/register" component={() => <Register />} />
          <ProtectedRoute
            exact
            path="/restaurants"
            component={RestaurantList}
          />
          <ProtectedRoute
            exact
            path="/restaurants/:id"
            component={Restaurant}
          />
          <ProtectedRoute
            exact
            path="/orders/:number"
            component={OrderConfirmation}
          />
          <ProtectedRoute exact path="/pastOrders" component={PastOrders} />
          <ProtectedRoute exact path="/order/submit" component={SubmitOrder} />
          <ProtectedRoute exact path="/addExtraInfo" component={AddExtraInfo} />
          <ProtectedRoute exact path="/settings" component={UserSettings} />
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
