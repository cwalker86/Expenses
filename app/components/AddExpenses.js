import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput
} from 'react-native';

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

class AddExpensesModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);
    
    // Store amount and description in state
    this.state = {
      amount: '',
      description: '',
    }
  }

  // Wraps any component that the Modal displays as children.
  render () {
    return (
      <Modal
        animationType={ 'slide' }
        transparent={ false }
        visible={ this.props.modalVisible }
      >
        <View style={ styles.modalContainer }>
          <Text style={ styles.headerText }>
            Add an Expense
          </Text>
          <View style={ styles.amountRow }>
            <Text style={ styles.amountText }>
              Amount
            </Text>
            <TextInput
              keyboardType={ 'numeric' }
              onChangeText={ (value) => this.updateAmount(value) }
              placeholder={ '0' }
              style={ styles.amountInput }
              value={ this.state.amount }
            />
          </View>
          <Text style={ styles.descriptionText }>
            Description
          </Text>
          <TextInput
            onChangeText={ (value) => this.updateDescription(value) }
            placeholder={ 'Gummie bears' }
            style={ styles.descriptionInput }
            value={ this.state.description }
          />
        </View>
      </Modal>
    )
  }

  updateAmount(amount) {
    this.setState({
      amount
    });
  }

  updateDescription(description) {
    this.setState({
      description
    });
  }
}

const styles = StyleSheet.create({
  amountInput: {
    borderColor: '#86B2CA',
    borderRadius: 10,
    borderWidth: 1,
    color: '#3D4A53',
    height: 40,
    margin: 10,
    padding: 10,
    width: 200
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  amountText: {
    color: '#3D4A53',
    margin: 10,
    marginLeft: 20,
    paddingTop: 10
  },
  descriptionInput: {
    borderColor: '#86B2CA',
    borderRadius: 10,
    borderWidth: 1,
    color: '#3a486f',
    height: 40,
    margin: 10,
    padding: 10
  },
  descriptionText: {
    color: '#3a486f',
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10
  },
  expandableCellContainer: {
    flex: 1
  },
  headerText: {
    color: '#7D878D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    marginTop: 100
  }
});
