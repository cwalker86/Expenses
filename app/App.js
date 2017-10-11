import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import EnterBudget from './components/EnterBudget';
import AddExpenses from './components/AddExpenses';
import CurrentMonthExpenses from './components/CurrentMonthExpenses';

import * as storageMethods from './utils/storage';
import * as dateMethods from './utils/dates';

export default class Expenses extends Component {
  constructor(props) {
    super();
    
    this.state = {
      budget: null
    }
  }
  
  componentWillMount() {
    this.setState({
      expenses: [],
      month: dateMethods.getMonth(),
      year: dateMethods.getYear(),
    });
    
    this.updateBudget();
  }
  
  renderEnterBudgetComponent() {
    console.log('getting here!');
      this.props.navigator.push({
        component: EnterBudget,
        navigationBarHidden: true,
        passProps: {
          monthString: dateMethods.getMonthString(this.state.month),
          saveAndUpdateBudget: (budget) => this.saveAndUpdateBudget(budget)
        }
      });
  }
  
  async saveAndUpdateBudget(budget) {
    await storageMethods.saveMonthlyBudget(this.state.month, this.state.year, budget);
    this.updateBudget();
  }
  
  async updateBudget() {
    let response = await storageMethods.checkCurrentMonthBudget();
    // If these is a response
    if (response !== false) {
      // Set state with the response
      this.setState({
        budget: response
      });
      // Update Month Expenses
      this.updateCurrentMonthExpenses();
      // Return to exit flow.
      return;
    }
    // Initate the budget screen because there isn't a budget.
    this.renderEnterBudgetComponent();
  }
  
  async updateCurrentMonthExpenses () {
  let responseObject = await storageMethods.getMonthObject(this.state.month, this.state.year);

  if (responseObject) {
    this.setState({
      budget: responseObject.budget,
      expenses: responseObject.expenses,
      spent: responseObject.spent
    });
  }
}
  
  render() {
    return (
      <View style={styles.container}>
        <CurrentMonthExpenses
          budget={ this.state.budget || '0' }
          expenses={ this.state.expenses }
          month={ this.state.month }
          spent={ this.state.spent || 0 }
          year={ this.state.year }
        />
        <AddExpenses
          month={ this.state.month }
          updateCurrentMonthExpenses={ () => this.updateCurrentMonthExpenses() }
          year={ this.state.year }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
