const redeemedReward = {
  availableAt: '2020-03-19T00:00:00Z',
  expiresAt: '2020-03-20T00:00:00Z',
  redeemedAt: '2020-03-19T00:00:00Z'
};
exports.redeemedReward = redeemedReward;

const userDataOn19 = {
  "id": "user-id",
  "rewards": {
    "2020-03-15T00:00:00Z": {
      availableAt: "2020-03-15T00:00:00Z",
      expiresAt: "2020-03-16T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-16T00:00:00Z": {
      availableAt: "2020-03-16T00:00:00Z",
      expiresAt: "2020-03-17T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-17T00:00:00Z": {
      availableAt: "2020-03-17T00:00:00Z",
      expiresAt: "2020-03-18T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-18T00:00:00Z": {
      availableAt: "2020-03-18T00:00:00Z",
      expiresAt: "2020-03-19T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-19T00:00:00Z": {
      availableAt: "2020-03-19T00:00:00Z",
      expiresAt: "2020-03-20T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-20T00:00:00Z": {
      availableAt: "2020-03-20T00:00:00Z",
      expiresAt: "2020-03-21T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-21T00:00:00Z": {
      availableAt: "2020-03-21T00:00:00Z",
      expiresAt: "2020-03-22T00:00:00Z",
      redeemedAt: null
    }
  }
};
exports.userDataOn19 = userDataOn19;

const nowDateISOString = '2020-03-19T00:00:00Z';
exports.nowDateISOString = nowDateISOString;

const nowDate = new Date(nowDateISOString);
exports.nowDate = nowDate;

const weekAfterDate = new Date('2020-03-26T00:00:00Z');
exports.weekAfterDate = weekAfterDate;
