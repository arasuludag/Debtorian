import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";

import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";

class Money extends Component {
  // Fetches the data from the server.
  updateInterval;
  componentDidMount() {
    this.props.fetchMoneyPage();

    // Fetches changes every 5 seconds.
    this.updateInterval = setInterval(() => {
      this.props.fetchMoneyPage();
    }, 5000);
  }

  state = {
    name: "",
    amount: "",
    info: "",
    trandId: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    var trans = {
      name: this.state.name,
      amount: this.state.amount,
      info: this.state.info,
      transId: this.state.transId,
    };

    axios.post("/api/money_page_info", { trans }).then((res) => {
      if (trans.name === "Leave" || trans.name === "Logout") {
        window.location = "/";
      }

      this.props.fetchMoneyPage();
    });
  };

  handleClickChange = (event) => {
    this.setState({ name: event.target.name, transId: event.target.value });
  };

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };
  handleInfoChange = (event) => {
    this.setState({ info: event.target.value });
  };

  listSpendings() {
    var mapped = this.props.money.transes
      .slice(0)
      .reverse()
      .map((trans, index) => {
        return (
          <Slide
            key={trans._id}
            direction="down"
            mountOnEnter
            in={true}
            timeout={1500}
          >
            <div key={trans._id} className="smoothbackground z-depth-3">
              <h6
                key={trans._id}
                className="collection-item"
                style={{
                  textDecoration: trans.crossedOut ? "line-through" : "none",
                }}
              >
                {trans.who} spent ${trans.amount} on {trans.info}
                <button
                  onClick={this.handleClickChange}
                  type="submit"
                  className="btn-floating btn-small waves-effect waves-light align-right-button cyan"
                  name="CrossOut"
                  value={trans._id}
                >
                  <img
                    src="delete-icon.png"
                    alt="delete"
                    style={{ width: "25px", height: "25px", marginTop: "3px" }}
                  />
                </button>
              </h6>
            </div>
          </Slide>
        );
      });
    return mapped;
  }

  stopOrContinueSpending() {
    if (this.props.money.higestSummedPerson === this.props.money.userName)
      return (
        <h6>
          You spent ${this.props.money.usersTotalSpending} in total. <br />
          Stop spending. Wait others to reach you.
        </h6>
      );
    else if (this.props.money.userDebt === undefined)
      return <h6>You haven't spent anything yet.</h6>;
    else
      return (
        <h6>
          You spent ${this.props.money.usersTotalSpending} in total. <br />
          Spend ${this.props.money.userDebt.toFixed(2)} more to reach{" "}
          {this.props.money.higestSummedPerson}.
        </h6>
      );
  }

  addSpending() {
    return (
      <div className="smoothbackground z-depth-3">
        <form onSubmit={this.handleSubmit} className="form-inline">
          <h6>I spent $</h6>

          <div style={{ width: "45px" }} className="input-field inline">
            <input
              style={{ width: "45px" }}
              onChange={this.handleAmountChange}
              type="number"
              step="0.01"
              id="email_inline"
              className="validate"
              name="amount"
            />
          <label htmlFor="email_inline">Ex: 20</label>
          </div>

          <h6> on </h6>

          <div style={{ width: "100px" }} className="input-field inline">
            <input
              style={{ width: "100px" }}
              onChange={this.handleInfoChange}
              type="text"
              id="email_inline"
              className="validate"
              name="info"
            />
            <label htmlFor="email_inline">Ex: Electric Bill</label>
          </div>

          <button
            onClick={this.handleClickChange}
            type="submit"
            name="SubmitSpending"
            className="btn-floating btn-small waves-effect waves-light cyan"
            style={{ marginLeft: "10px" }}
          >
            <img
              src="plus-icon.png"
              alt="delete"
              style={{ width: "15px", height: "15px", marginTop: "9px" }}
            />
          </button>
        </form>
      </div>
    );
  }

  showPerson() {
    switch (this.props.money) {
      case null: {
        return (
          <div style={{ margin: "auto", width: "50%" }}>
            <CircularProgress /> <br />{" "}
            <p>If this is taking too long you're logged out.</p>
          </div>
        );
      }
      case false: {
        return <h4>You are definitely logged out!</h4>;
      }
      default:
        return (
          <div className="row">
            <div className="col s12 l1">
              <a
                href="/"
                role="button"
                className="btn btn-large waves-effect waves-light grey darken-4"
                style={{ marginTop: "20px", right: "20px" }}
              >
                Back
              </a>
            </div>
            <div className="col l5 s12 smoothbackground spendinginputbackground z-depth-4">
              <h4>Hello, {this.props.money.userName}</h4>
              <h5>You're in {this.props.money.house.name}.</h5>
              <br />

              {this.stopOrContinueSpending()}

              <form onSubmit={this.handleSubmit} className="form-inline">
                <button
                  type="submit"
                  onClick={this.handleClickChange}
                  name="Logout"
                  className="btn-large waves-effect waves-light cyan"
                  style={{ marginTop: "40px", marginRight: "10px" }}
                >
                  Log out
                </button>

                <br />
                <button
                  type="submit"
                  onClick={this.handleClickChange}
                  name="Leave"
                  className="btn-large waves-effect waves-light grey darken-4"
                  style={{ marginTop: "5px" }}
                >
                  Leave {this.props.money.house.name}
                </button>
              </form>
              <p style={{ marginTop: "40px" }}>
                People can join {this.props.money.house.name} with this code:{" "}
                {this.props.money.budgetId}
              </p>
            </div>
            <div className="col l5 s12">
              {this.addSpending()}

              <form onSubmit={this.handleSubmit}>
                <ul className="collection">{this.listSpendings()}</ul>
              </form>
            </div>
          </div>
        );
    }
  }

  render() {
    return <div className="Squezer">{this.showPerson()}</div>;
  }
}

function mapStateToProps({ money }) {
  return { money };
}

export default connect(mapStateToProps, actions)(Money);
