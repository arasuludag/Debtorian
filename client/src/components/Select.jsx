import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from "axios";

class Select extends Component {

  state = {
    name: '',
    value: ''
  };

  handleSubmit = event => {
      event.preventDefault();

      const taskData = {
        name: this.state.name,
        value: this.state.value
      }

      var path;
      if (taskData.name === "budgetButton") { console.log(taskData.name); path = '/money'; }
      else {path = '/';}//This line of code will redirect you once the submission is succeed

      axios.post('/api/select', {taskData})
        .then(res=>{
          window.location = path; //This line of code will redirect you once the submission is succeed
        })
    }


    handleClickChange = event =>{this.setState({ name: event.target.name, value: event.target.value});}

    handleClickChangeNewBudget = event =>{this.setState({ name: event.target.name});}
    handleNewBudgetNameChange = event =>{this.setState({ value: event.target.value});}
    handleClickChangeExistBudget = event =>{this.setState({ name: event.target.name});}
    handleExistBudgetNameChange = event =>{this.setState({ value: event.target.value});}


  showBudgets()
  {
    switch (this.props.select) {
      case null: { return <h3>Loading...</h3> }
      case false: { return <h3>You are logged out!</h3> }
      default: return (this.props.select.map(budgets =>
            <button key={budgets._id} type="submit" className="btn-large waves-effect waves-light cyan budgetButton" name = "budgetButton" value = {budgets._id} onClick={this.handleClickChange}> {budgets.name} </button>
          ));
    }
  }


  render() {

  return (
    <div className="Squezer">
      <div className="row">
     <div className="col l6 s12 offset-l3 smoothbackground z-depth-4">
       <h2>You have to select a budget.</h2>
       <br />
       <form onSubmit = { this.handleSubmit }>
         {this.showBudgets()}
       <br />
         <div className="form-group">

         <div className="input-field col s8">
           <h4>You can create a new one,</h4>
        </div>

       <div className="input-field col s8">
       <div className="input-field col s10">
         <i className="material-icons prefix">account_balance_wallet</i>
         <input type="text" id="icon_balance" className="validate" name="budgetName" onChange= {this.handleNewBudgetNameChange}/>
         <label htmlFor="icon_balance">Ex: The House</label>
         </div>
         <div className="input-field col s2">
         <button onClick={this.handleClickChangeNewBudget} type="submit" className="btn btn-large waves-effect waves-light cyan" name="addNewBudget">Add</button>
         </div>
       </div>



       <div className="input-field col s10">
         <h4>or enter the code you have taken from an existing one.</h4>
      </div>

       <div className="input-field col s12">
       <div className="input-field col s8">
         <i className="material-icons prefix">short_text</i>
         <input type="text" id="icon_text" className="validate" name="budgetCode" onChange= {this.handleExistBudgetNameChange}/>
         <label htmlFor="icon_text">Enter the Code</label>
         </div>
         <div className="input-field col s4">
         <button onClick={this.handleClickChangeExistBudget} type="submit" className="btn btn-large waves-effect waves-light cyan" name = "addExistingBudget">Add Existing</button>
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

function mapStateToProps({select}) {
  return { select };
}

export default connect(mapStateToProps)(Select);
