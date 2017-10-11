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

// Grab object in storage under the key expenses and return it.
export const getAsyncStorage = async() => {
  let response = await AsyncStorage.getItem('expenses');
  let parseData = JSON.parse(response) || {};
  
  return parseData;
}

// Set expenses object by overriding it
export const setAsyncStorage = (expenses) => {
  return AsyncStorage.setItem('expenses', JSON.stringify(expenses));
}

export const checkCurrentMonthBudget = async () => {
  let year = dateMethods.getYear();
  let month = dateMethods.getMonth();
  
  let response = await getAsyncStorage();
  
  if(response === null || !response.hasOwnProperty(year) || !reponse[year].hasOwnProperty(month)) {
    return false;
  }
  
  return response[year][month].budget;
}

// Gran expenses, check if a result exists. Seed with default empty data if none exists.
export const saveMonthlyBudget = async (month, year, budget) => {
  let response = await getAsyncStorage();
  
  if(!response.hasOwnProperty(year)) {
    response[year] = {};
  }
  
  if(!response[year].hasOwnProperty(month)) {
    response[year][month] = {
      budget: undefined,
      expenses: [],
      spent: 0
    }
  }
  
  response[year][month].budget = budget;
  
  return;
}

// Erases the expenses object.
export const resetAsyncStorage = () => {
  return setAsyncStorage({});
}

// Prints what's in storage.
export const logAsyncStorage = async() => {
  let response = await getAsyncStorage();
  
  console.log('Loggin Async Storage');
  console.table(response);
}
