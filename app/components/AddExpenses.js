import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  DatePickerIOS
} from 'react-native';

import AddExpensesModal from './AddExpensesModal';

// Exporting AddExpenses as Parent Component.
export default class AddExpenses extends Component {
  static propTypes = {
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state={
      modalVisible: false
    }
  }
  
  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  
  render() {
    return (
      <View>
        <AddExpensesModal
          modalVisible={this.state.modalVisible}
          month={this.props.month}
          year={this.props.year}
        />
        <Button
          color={ '#86B2CA' }
          onPress={ () => this.toggleModal() }
          title={ 'Add Expense' }
        />
      </View>
    )
  }
}
