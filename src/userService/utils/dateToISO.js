/**
 * Returns the Date as a ISO string without milliseconds.
 */
function dateToISO(date) {
  return new Date(date).toISOString().slice(0, -5) + "Z";
}

exports.dateToISO = dateToISO;
