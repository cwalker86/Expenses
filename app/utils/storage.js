// Deals with access to AsyncStorage.

import { AsyncStorage } from 'react-native';
import * as dateMethods from './dates';

// What the data may look like
/*
  listOfExpenses = {
    2017: {
      o1: {
        budget: 500,
        expenses: [
          {
            amount: '2',
            category: 'Coffee',
            date: 'October 10, 2017',
            description: 'Starbucks'
        },
        {
          amount: '1.50',
          category: 'Books',
          date: 'October 11, 2017',
          description: 'Batman Comic'
        }
      ]
    }
  }
}
*/

export const getAsyncStorage = async () => {
  let response = await AsyncStorage.getItem('expenses');
  let parsedData = JSON.parse(response) || {};

  return parsedData;
}

export const setAsyncStorage = (expenses) => {
  return AsyncStorage.setItem('expenses', JSON.stringify(expenses));
}

export const checkCurrentMonthBudget = async () => {
  let year = dateMethods.getYear();
  let month = dateMethods.getMonth();

  let response = await getAsyncStorage();

  if (response === null || !response.hasOwnProperty(year) || !response[year].hasOwnProperty(month)) {
    return false;
  }

  return response[year][month].budget;
}

export const saveMonthlyBudget = async (month, year, budget) => {
  let response = await getAsyncStorage();

  if (!response.hasOwnProperty(year)) {
    response[year] = {};
  }

  if (!response[year].hasOwnProperty(month)) {
    response[year][month] = {
      budget: undefined,
      expenses: [],
      spent: 0
    }
  }

  response[year][month].budget = budget;

  await setAsyncStorage(response);

  return;
}

export const resetAsyncStorage = () => {
  return setAsyncStorage({});
}

export const logAsyncStorage = async () => {
  let response = await getAsyncStorage();

  console.log('Logging Async Storage');
  console.table(response);
}

const getTotalSpentForMonth = (array) => {
  let total = 0;

  array.forEach((elem) => {
    total += parseInt(elem.amount)
  });

  return total;
}

export const saveItemToBudget = async (month, year, expenseObject) => {
  let response = await getAsyncStorage();

  let newExpensesArray = [
    ...response[year][month].expenses,
    expenseObject
  ];

  let newTotal = getTotalSpentForMonth(newExpensesArray);

  response[year][month].expenses = newExpensesArray;
  response[year][month].spent = newTotal;

  await setAsyncStorage(response);

  return true;
}
