import React, { Component } from "react";
import Dropzone from "react-dropzone";

import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", selectedFile: null };
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentDidMount() {
    axios
      .get("user/currentUser", {
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

  handleChange(droppedFile) {
    const uploadFile = droppedFile[0];
    this.setState({ selectedFile: uploadFile });
  }

  uploadFile() {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios.post("/restaurants/upload", data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      body: data
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.logOut}>Log Out</button>
        <button onClick={this.uploadFile}>Upload</button>
        <div>Hello {this.state.firstName}!</div>
      </div>
    );
  }
}

export default Home;
