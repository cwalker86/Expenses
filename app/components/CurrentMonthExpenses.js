import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  Text,
  View,
  StyleSheet
} from 'react-native';

import * as dateMethods from '../utils/dates';
import * as storageMethods from '../utils/storage';

import ExpenseRow from './ExpenseRow';

export default class CurrentMonthExpenses extends Component {
  static propTypes = {
    budget: PropTypes.string.isRequired,
    expenses: PropTypes.array.isRequired,
    month: PropTypes.string.isRequired,
    spent: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
  }

  constructor (props) {
    super (props);

    this.state = {
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
    }
  }

  render () {
    const dataSource = this.state.ds.cloneWithRows(this.props.expenses || []);

    return (
      <View style={ styles.currentMonthExpensesContainer }>
        <View style={ styles.currentMonthExpensesHeader }>
          <Text style={ styles.headerText }>
            Your { dateMethods.getMonthString(this.props.month) + ' ' + this.props.year } budget:
          </Text>
          <Text style={ styles.subText }>
            { this.props.budget }
          </Text>
        </View>
        <ListView
          automaticallyAdjustContentInsets={ false }
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={ (rowData, sectionID, rowID) => this.renderRowData(rowData, rowID) }
          renderSeparator={ (sectionID, rowID) => this.renderRowSeparator(sectionID, rowID) }
        />
      </View>
    )
  }

  renderRowData (rowData, rowID) {
    if (rowData) {
      return (
        <ExpenseRow
          amount={ rowData.amount }
          description={ rowData.description }
        />
      )
    }
  }

  renderRowSeparator (sectionID, rowID) {
    return (
      <View
        key={ rowID }
        style={ styles.rowSeparator }
      />
    )
  }
};

const styles = StyleSheet.create({
  currentMonthExpensesContainer: {
    flex: 1,
  },
  currentMonthExpensesHeader: {
    height: 80,
  },
  headerText: {
    color: '#7D878D',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  rowSeparator: {
    backgroundColor: '#7D878D',
    flex: 1,
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    marginRight: 15
  },
  subText: {
    color: '#3D4A53',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
