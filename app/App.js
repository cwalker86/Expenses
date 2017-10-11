import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import EnterBudget from './components/EnterBudget';
import AddExpenses from './components/AddExpenses';

import * as storageMethods from './utils/storage';
import * as dateMethods from './utils/dates';

export default class Expenses extends Component<{}> {
  constructor(props) {
    super();
    
    this.state = {
      budget: undefined
    }
  }
  
  componentWillMount() {
    this.setState({
      month: dateMethods.getMonth(),
      year: dateMethods.getYear(),
    });
    
    this.updateBudget();
  }
  
  renderEnterBudgetComponent() {
    if(!this.state.budget) {
      this.props.navigator.push({
        component: EnterBudget,
        navigationBarHidden: true,
        passProps: {
          monthString: dateMethods.getMonthString(this.state.month),
          saveAndUpdateBudget: (budget) => this.saveAndUpdateBudget(budget)
        }
      });
    }
  }
  
  async saveAndUpdateBudget(budget) {
    await storageMethods.saveMonthlyBudget(this.state.month, this.state.year, budget);
    this.updateBudget();
  }
  
  async updateBudget() {
    let response = await storageMethods.checkCurrentMonthBudget();
    if (response !== false) {
      this.setState({
        budget: response
      });
      return;
    }
    this.renderEnterBudgetComponent();
  }
  
  render() {
    console.log('State: ', this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Your budget is { this.state.budget || 'not set' }!
        </Text>
        <AddExpenses
          month={this.state.month}
          year={this.state.year}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
