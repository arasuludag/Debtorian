import React, { Component } from "react";
import axios from "axios";

import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    axios.post("/api/login", { user }).then((res) => {
      window.location = "/"; //This line of code will redirect you once the submission is succeed
    });
  };

  handleNameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePassChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="Squezer">
        <Grow in={true} timeout = {1000}>
        <div className="row">
          <div className="smoothbackground col s12 l5 offset-l3 z-depth-4">
            <form onSubmit={this.handleSubmit}>
              <h1>Log in.</h1>
              <div className="row">
                <div className="input-field col s6">
                  <i className="material-icons prefix">account_box</i>
                  <input
                    type="email"
                    id="icon_user"
                    className="validate"
                    name="username"
                    onChange={this.handleNameChange}
                  />
                  <label htmlFor="icon_user">Email</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">lock</i>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handlePassChange}
                    id="icon_password"
                    className="validate"
                  />
                  <label htmlFor="icon_password">Password</label>
                </div>
                <Zoom in={true} timeout = {1000}>
                <button
                  type="submit"
                  className="btn-large waves-effect waves-light cyan"
                  style={{ marginLeft: "20px" }}
                >
                  Login
                </button>
              </Zoom>
              </div>
            </form>
          </div>
        </div>
      </Grow>
      </div>
    );
  }
}

export default Login;
