import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";

import Zoom from "@material-ui/core/Zoom";
import CircularProgress from "@material-ui/core/CircularProgress";

class Select extends Component {
  componentDidMount() {
    this.props.fetchSelectPage();
  }

  state = {
    name: "",
    value: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const taskData = {
      name: this.state.name,
      value: this.state.value,
    };

    axios.post("/api/select", { taskData }).then((res) => {
      if (taskData.name === "budgetButton") {
        window.location = "/money";
      } else {
        this.props.fetchSelectPage();
      }
    });
  };

  handleClickChange = (event) => {
    this.setState({ name: event.target.name, value: event.target.value });
  };

  handleClickChangeNewBudget = (event) => {
    this.setState({ name: event.target.name });
  };
  handleNewBudgetNameChange = (event) => {
    this.setState({ value: event.target.value });
  };
  handleClickChangeExistBudget = (event) => {
    this.setState({ name: event.target.name });
  };
  handleExistBudgetNameChange = (event) => {
    this.setState({ value: event.target.value });
  };

  showBudgets() {
    switch (this.props.select) {
      case null: {
        return <CircularProgress />;
      }
      case false: {
        return <h3>You are logged out!</h3>;
      }
      default:
        return this.props.select.map((budgets, index) => (
          <Zoom key={budgets._id} in={true} timeout={(index + 1) * 250}>
            <button
              key={budgets._id}
              type="submit"
              className="btn-large waves-effect waves-light cyan budgetButton"
              name="budgetButton"
              value={budgets._id}
              onClick={this.handleClickChange}
            >
              {" "}
              {budgets.name}{" "}
            </button>
          </Zoom>
        ));
    }
  }

  render() {
    return (
      <div className="Squezer">
        <div className="row">
          <div className="col l6 s12 offset-l3 smoothbackground z-depth-4">
            <h3>You have to select a budget.</h3>
            <br />
            <form onSubmit={this.handleSubmit}>
              {this.showBudgets()}
              <br />
              <div className="form-group">
                <div className="input-field col s8">
                  <h5>You can create a new one,</h5>
                </div>

                <div className="input-field col s12">
                  <div className="input-field col s8 l5">
                    <i className="material-icons prefix">
                      account_balance_wallet
                    </i>
                    <input
                      type="text"
                      id="icon_balance"
                      className="validate"
                      name="budgetName"
                      onChange={this.handleNewBudgetNameChange}
                    />
                    <label htmlFor="icon_balance">Ex: House</label>
                  </div>
                  <div className="input-field col l2 s2">
                    <button
                      onClick={this.handleClickChangeNewBudget}
                      type="submit"
                      className="btn btn-large waves-effect waves-light cyan"
                      name="addNewBudget"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="input-field col s10">
                  <h5>
                    or enter the code you have taken from an existing one.
                  </h5>
                </div>

                <div className="input-field col s12">
                  <div className="input-field col s12 l8">
                    <i className="material-icons prefix">short_text</i>
                    <input
                      type="text"
                      id="icon_text"
                      className="validate"
                      name="budgetCode"
                      onChange={this.handleExistBudgetNameChange}
                    />
                    <label htmlFor="icon_text">Enter the Code</label>
                  </div>
                  <div className="input-field col s12 l4">
                    <button
                      onClick={this.handleClickChangeExistBudget}
                      type="submit"
                      className="btn btn-large waves-effect waves-light cyan"
                      name="addExistingBudget"
                    >
                      Add Existing
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ select }) {
  return { select };
}

export default connect(mapStateToProps, actions)(Select);
