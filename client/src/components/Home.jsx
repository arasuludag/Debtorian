import React, {Component} from "react";

class Home extends Component {

  render() {
    return (<div className="Squezer">
      <div className="row">
        <div className="col s12 l6 offset-l3 smoothbackground z-depth-4">
          <h1>Welcome to Debtorian.</h1>
          <h3>You can login or register.</h3>
          <br/>
          <br/>
          <a className="btn-large waves-effect waves-light grey darken-4" style={{
              marginRight: "10px",
              marginBottom: "20px"
            }} href="/register" role="button">
            Register
          </a>
          <a className="btn-large waves-effect waves-light cyan" style={{
              marginRight: "10px",
              marginBottom: "20px"
            }} href="/login" role="button">
            Login
          </a>
        </div>
      </div>
    </div>);
  }
}

export default Home;
