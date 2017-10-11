// Component should enter a budget
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet
} from 'react-native';
import * as dateMethods from '../utils/dates';

export default class EnterBudget extends Component {
  
  static propTypes = {
    monthString: PropTypes.string.isRequired,
    saveAndUpdateBudget: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      budget: null
    }
  }
  
  // Calls saveAndUpdateBudget from App.js and pop on navigator
  saveAndUpdateBudget() {
    this.props.saveAndUpdateBudget(this.state.budget);
    this.props.navigator.pop();
  }
  
  setBudgetValue(budget) {
    this.setState({
      budget
    });
  }
  
  render() {
    let month = dateMethods.getMonthString(dateMethods.getMonth());
    
    return (
      <View style={styles.enterBudgetContainer}>
        <Text style={styles.enterBudgetHeader}>
          Enter Your { this.props.monthString } Budget
        </Text>
        <Text style={styles.enterBudgetText }>
          What's your spending goal?
        </Text>
        <TextInput
          style={styles.textInput }
          onChangeText={(budget) => this.setBudgetValue(budget)}
          value={this.state.budget}
          placeholder={'0'}
          keyboardType={'numeric'}
        />
        <View>
          <Button
            color={'#3D4A53'}
            disabled={!this.state.budget}
            onPress={() => this.saveAndUpdateBudget()}
            title={'Save Budget'}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  enterBudgetContainer: {
    flex: 1,
    marginTop: 100
  },
  enterBudgetHeader: {
    color: '#3D4A53',
    fontSize: 24,
    margin: 10,
    textAlign: 'center'
  },
  enterBudgetText: {
    color: '#3D4A53',
    fontSize: 16,
    margin: 10,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#86B2CA',
    borderWidth: 1,
    color: '#3D4A53',
    margin: 10,
    padding: 10,
    textAlign: 'center'
  }
})
