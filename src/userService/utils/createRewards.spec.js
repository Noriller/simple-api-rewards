const { getDatesFromWeek, getUserRewardsDates } = require('./createRewards');

describe('createRewards', () => {
  describe('getDatesFromWeek', () => {
    it('should return an array of dates', () => {
      expect(getDatesFromWeek('2020-03-19')).toEqual([
        '2020-03-15',
        '2020-03-16',
        '2020-03-17',
        '2020-03-18',
        '2020-03-19',
        '2020-03-20',
        '2020-03-21',
      ]);
    });
  });

  describe('getUserRewardsDates', () => {
    it('should return an object with dates', () => {
      expect(getUserRewardsDates('2020-03-19')).toEqual({
        '2020-03-15T00:00:00Z': {
          availableAt: '2020-03-15T00:00:00Z',
          redeemedAt: null,
          expiresAt: '2020-03-16T00:00:00Z',
        },
        '2020-03-16T00:00:00Z': {
          availableAt: '2020-03-16T00:00:00Z',
          redeemedAt: null,
          expiresAt: '2020-03-17T00:00:00Z',
        },
        '2020-03-17T00:00:00Z': {
          availableAt: '2020-03-17T00:00:00Z',
          redeemedAt: null,
          expiresAt: '2020-03-18T00:00:00Z',
        },
        '2020-03-18T00:00:00Z': {
          availableAt: '2020-03-18T00:00:00Z',
          redeemedAt: null,
          expiresAt: '2020-03-19T00:00:00Z',
        },
        '2020-03-19T00:00:00Z': {
          availableAt: '2020-03-19T00:00:00Z',
          redeemedAt: null,
          expiresAt: '2020-03-20T00:00:00Z',
        },
        '2020-03-20T00:00:00Z': {
          availableAt: '2020-03-20T00:00:00Z',
          redeemedAt: null,
          expiresAt: '2020-03-21T00:00:00Z',
        },
        '2020-03-21T00:00:00Z': {
          availableAt: '2020-03-21T00:00:00Z',
          redeemedAt: null,
          expiresAt: '2020-03-22T00:00:00Z',
        },
      });
    });
  });
});