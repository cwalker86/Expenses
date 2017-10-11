import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as storageMethods from './utils/storage';

export default class Expenses extends Component<{}> {
  constructor(props) {
    super();
    
    this.state = {
      budget: undefined
    }
  }
  componentWillMount() {
    // 1) Check current month's budget and set it in state. If there is no budget, alert user.
    // storageMethods.checkCurrentMonthBudget()
    // .then((response) => {
    //   if(response !== false) {
    //     this.setState({
    //       budget: response
    //     });  
    //     return;
    //   }
    //   alert('Where is your budget for the month?!?!');
    // });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Your budget is { this.state.budget || 'not set' }!
        </Text>
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
