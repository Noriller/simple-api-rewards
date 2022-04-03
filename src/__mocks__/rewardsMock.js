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

const userDataOn26 = {
  ...userDataOn19,
  rewards: {
    ...userDataOn19.rewards,
    "2020-03-22T00:00:00Z": {
      availableAt: "2020-03-22T00:00:00Z",
      expiresAt: "2020-03-23T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-23T00:00:00Z": {
      availableAt: "2020-03-23T00:00:00Z",
      expiresAt: "2020-03-24T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-24T00:00:00Z": {
      availableAt: "2020-03-24T00:00:00Z",
      expiresAt: "2020-03-25T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-25T00:00:00Z": {
      availableAt: "2020-03-25T00:00:00Z",
      expiresAt: "2020-03-26T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-26T00:00:00Z": {
      availableAt: "2020-03-26T00:00:00Z",
      expiresAt: "2020-03-27T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-27T00:00:00Z": {
      availableAt: "2020-03-27T00:00:00Z",
      expiresAt: "2020-03-28T00:00:00Z",
      redeemedAt: null
    },
    "2020-03-28T00:00:00Z": {
      availableAt: "2020-03-28T00:00:00Z",
      expiresAt: "2020-03-29T00:00:00Z",
      redeemedAt: null
    },
  }
};
exports.userDataOn26 = userDataOn26;

const nowDateISOString = '2020-03-19T00:00:00Z';
exports.nowDateISOString = nowDateISOString;

const weekAfterDateISOString = '2020-03-26T00:00:00Z';
exports.weekAfterDateISOString = weekAfterDateISOString;

const nowDate = new Date(nowDateISOString);
exports.nowDate = nowDate;

const weekAfterDate = new Date('2020-03-26T00:00:00Z');
exports.weekAfterDate = weekAfterDate;
