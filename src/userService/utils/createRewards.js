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
  const weekArray = [];
  const startDate = new Date(date);
  const endDate = new Date(date);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  while (startDate <= endDate) {
    weekArray.push(startDate.toISOString().slice(0, 10));
    startDate.setDate(startDate.getDate() + 1);
  }
  return weekArray;
}

exports.getDatesFromWeek = getDatesFromWeek;
exports.getUserRewardsDates = getUserRewardsDates;