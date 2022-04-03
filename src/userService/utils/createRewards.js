const { dateToISO } = require('./dateToISO');

const oneMinute = 60 * 1000;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;

function getUserRewardsDates(date) {
  const weekArray = getDatesFromWeek(date);

  return weekArray.reduce((acc, date) => {
    const isoDatePlusOne = new Date(date).getTime() + oneDay;

    acc[dateToISO(date)] = {
      availableAt: dateToISO(date),
      redeemedAt: null,
      expiresAt: dateToISO(isoDatePlusOne),
    };

    return acc;
  }, {});
}

function getDatesFromWeek(date) {
  // start two dates as boundaries
  const weekStart = new Date(date);
  const weekEnd = new Date(date);

  // set the start date as the date minus the day of the week
  // getDay starts at monday, so we take one from that to get sunday
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() - 1);
  // here we "reset" the date to monday and then add 5 days to get saturday
  weekEnd.setDate(weekEnd.getDate() - weekEnd.getDay() + 5);

  const weekArray = [];

  // loop through the week and push each date to the array
  while (weekStart <= weekEnd) {
    weekArray.push(weekStart.toISOString().split('T')[0]);
    // add one day to the date
    weekStart.setDate(weekStart.getDate() + 1);
  }

  return weekArray;
}

exports.getDatesFromWeek = getDatesFromWeek;
exports.getUserRewardsDates = getUserRewardsDates;
