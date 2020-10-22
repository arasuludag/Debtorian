import React, { Component } from "react";

import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';

class Home extends Component {

  render() {
    return (
      <div className="Squezer">
         <Grow in={true} timeout = {1000}>
        <div className="row">
          <div className="col s12 l6 offset-l3 smoothbackground z-depth-4">
            <h2>Welcome to Debtorian.</h2>
            <h4>You can login or register.</h4>
            <br />
            <br />
            <Zoom in={true} timeout = {1000}>
            <a
              className="btn-large waves-effect waves-light grey darken-4"
              style={{
                marginRight: "10px",
                marginBottom: "20px",
              }}
              href="/register"
              role="button"
            >
              Register
            </a>
          </Zoom>
            <Zoom in={true} timeout = {1500}>
            <a
              className="btn-large waves-effect waves-light cyan"
              style={{
                marginRight: "10px",
                marginBottom: "20px",
              }}
              href="/login"
              role="button"
            >
              Login
            </a>
            </Zoom>
          </div>
        </div>
      </Grow>
      </div>
    );
  }
}

export default Home;
