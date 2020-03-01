import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "" };
  }

  componentDidMount() {
    axios
      .get("/currentUser", {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      })
      .then(res => res.data.name)
      .then(data => {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName
        });
      });
  }

  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth");
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <button onClick={this.logOut}>Log Out</button>
        <div>Hello {this.state.firstName}!</div>
      </div>
    );
  }
}

export default Home;
