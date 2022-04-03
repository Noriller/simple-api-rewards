const { dateToISO } = require('./dateToISO');

describe('dateToISO', () => {
  it('should return a string with the correct format', () => {
    expect(dateToISO('2020-01-01')).toEqual("2020-01-01T00:00:00.000Z");
  });
  it('should throw on invalid date', () => {
    expect(() => dateToISO('invalid')).toThrowError('Invalid time value');
  });
});