import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  DatePickerIOS,
  Modal,
  Text,
  TextInput,
  StyleSheet,
  View
} from 'react-native';

import moment from 'moment';

import ExpandableCell from './ExpandableCell';

export default class AddExpensesModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    month: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }

  constructor (props) {
    super (props);
    
    this.state = {
      amount: '',
      description: '',
      date: new Date(),
      expanded: false
    }
  }

  // Wraps any component that the Modal displays as children.
  render () {
    const expandableCellTitle = 'Date: ' + moment(this.state.date).format('ll') + ' (tap to change)';
    
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
              onChangeText={ (value) => this._changeAmount(value) }
              placeholder={ '0' }
              style={ styles.amountInput }
              value={ this.state.amount }
            />
          </View>
          <Text style={ styles.descriptionText }>
            Description
          </Text>
          <TextInput
            onChangeText={ (value) => this._changeDescription(value) }
            placeholder={ 'Book on React Native development' }
            style={ styles.descriptionInput }
            value={ this.state.description }
          />
          <View style={ [styles.expandableCellContainer, { maxHeight: this.state.expanded ? this.state.datePickerHeight : 40 }]}>
            <ExpandableCell
              expanded={ this.state.expanded }
              onPress={ () => this.onExpand() }
              title={ expandableCellTitle }>
              <DatePickerIOS
                date={ this.state.date }
                mode={ 'date' }
                onDateChange={ (date) => this.onDateChange(date) }
                onLayout={ (event) => this.getDatePickerHeight(event) }
              />
            </ExpandableCell>
          </View>
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
  
  getDatePickerHeight (event) {
    this.setState({
      datePickerHeight: event.nativeEvent.layout.width
    });
  }

  onDateChange (date) {
    this.setState({
      date
    });
  }

  onExpand () {
    this.setState({
      expanded: !this.state.expanded
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
  },
  expandableCellContainer: {
  flex: 1,
  padding: 10
  },
});
