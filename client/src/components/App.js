import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../actions';

import "./styles.css";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Money from "./Money";
import Landing from "./Landing";

class App extends Component {

  componentDidMount() {

    this.props.fetchUser();

  }

  render() {
    return (<Router>
      <div className="App">
        <Switch>
          <Route path="/money">
            <Money/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>

        <Footer/>
      </div>
    </Router>);
  }
}

export default connect(null, actions)(App);
