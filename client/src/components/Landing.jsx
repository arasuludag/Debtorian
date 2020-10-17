import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import Home from "./Home";
import Select from "./Select";

class Landing extends Component {


  render() {
  return (
    <Router>
    {this.props.auth ? <Select /> :
    <Home />}
    </Router>
  );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}


export default connect(mapStateToProps)(Landing);
