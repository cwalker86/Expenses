// Deals with methods that will be used to get different parts of dates.

const monthNames = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

// Grabs current year and returns it as a string
export const getYear = (date) => {
  date = date || new Date();
  return date.getFullYear().toString();
}

// Grabs current month, and returns which number it is as a string
export const getMonth = (date) => {
  date = date || new Date();
  const zeroIndexMonth = date.getMonth();
  return (zeroIndexMonth + 1).toString();
}

// Grabs the day, and returns it as a string
export const getDay = (date) => {
  date = date || new Date();
  return date.getDate().toString();
}

// Grabs the name of the month, given a number.
export const getMonthString = (monthInt) => {
  if (typeof monthInt === 'string') {
    monthInt = parseInt(monthInt);
  }
  
  return monthNames[monthInt];
}
