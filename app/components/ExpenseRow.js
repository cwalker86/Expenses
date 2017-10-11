import React from 'react';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';

// Stateless functional component
// A function that takes in any number of props passed into it, and returns a component that
// can be used in React applications.
export default (props) => {
  return (
    <View style={ styles.expenseRowContainer }>
      <Text style={ styles.descriptionText }>
        { props.description }
      </Text>
      <Text style={ styles.amountText }>
        { props.amount }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  amountText: {
    color: '#86B2CA',
    flex: 1,
    fontSize: 20,
    textAlign: 'right'
  },
  descriptionText: {
    color: '#7D878D',
    fontSize: 20,
    textAlign: 'left'
  },
  expenseRowContainer: {
    flexDirection: 'row',
    height: 50,
    padding: 10
  }
});
