import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    name: "",
    username: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
    };

    axios.post("/api/register", { user }).then((res) => {
      window.location = "/";
    });
  };

  handleUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePassChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div className="Squezer">
        <div className="row">
          <div className="smoothbackground col s12 l5 offset-l3 z-depth-4">
            <form onSubmit={this.handleSubmit}>
              <h1>Register.</h1>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">person</i>
                  <input
                    type="text"
                    id="icon_name"
                    className="validate"
                    name="name"
                    onChange={this.handleNameChange}
                  />
                  <label htmlFor="icon_name">Name</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_box</i>
                  <input
                    type="email"
                    id="icon_user"
                    className="validate"
                    name="email"
                    onChange={this.handleUserNameChange}
                  />
                  <label htmlFor="icon_user">Email</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handlePassChange}
                    id="icon_password"
                    className="validate"
                  />
                  <label htmlFor="icon_password">Password</label>
                  <p>
                    You can choose any name you want but be sure that it will be
                    unique among your friends. Otherwise this'll be pretty
                    awkward.
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn-large waves-effect waves-light cyan"
                  style={{ marginLeft: "20px" }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
