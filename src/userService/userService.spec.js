const UserService = require('.');
const database = require('../database');
const {
  nowDate,
  userDataOn19,
  weekAfterDate,
  redeemedReward,
  nowDateISOString
} = require("../__mocks__/rewardsMock");

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2020-03-19T00:00:00Z').getTime());

    userService = UserService(database);
  });

  afterEach(() => {
    jest.useRealTimers();
    database.clear();
  });

  describe('getUser', () => {
    it('should get user', () => {
      const user = userService.getUser('user-id', nowDate);

      expect(user).toEqual(userDataOn19);
    });

    it('should get same user twice with dates within same week', () => {
      const user = userService.getUser('user-id', nowDate);

      expect(user).toEqual(userDataOn19);

      const user2 = userService.getUser('user-id', new Date('2020-03-21T00:00:00Z'));

      expect(user2).toEqual(userDataOn19);
    });

    it('should get same user twice with dates a week apart', () => {
      const user = userService.getUser('user-id', nowDate);

      expect(user).toEqual(userDataOn19);

      const user2 = userService.getUser('user-id', weekAfterDate);

      const userDateOn26 = {
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

      expect(user2).toEqual(userDateOn26);
    });

    it('should update the redeemed getting a reward', () => {
      userService.getUser('user-id', nowDate);
      const reward = userService.redeemReward('user-id', nowDate);

      expect(reward).toEqual({ message: redeemedReward });

      const user = userService.getUser('user-id', nowDate);
      expect(user.rewards[nowDateISOString]).toEqual(redeemedReward);
    });
  });

  describe('redeemReward', () => {
    it('should get rewards from user', () => {
      userService.getUser('user-id', nowDate);
      const reward = userService.redeemReward('user-id', nowDate);

      expect(reward).toEqual({ message: redeemedReward });
    });

    it('should return error if reward was already redeemed', () => {
      userService.getUser('user-id', nowDate);
      const reward = userService.redeemReward('user-id', nowDate);

      expect(reward).toEqual({ message: redeemedReward });

      const reward2 = userService.redeemReward('user-id', nowDate);

      expect(reward2).toEqual({ "error": "This reward was already redeemed" });
    });

    it('should return error if reward is not available', () => {
      userService.getUser('user-id', nowDate);
      const reward = userService.redeemReward('user-id', weekAfterDate);

      expect(reward).toEqual({ "error": "This reward was not found" });
    });

    it('should return error if user does not exist', () => {
      const reward = userService.redeemReward('user-id', nowDate);

      expect(reward).toEqual({ "error": "The user was not found" });
    });

    it('should return error if its expired', () => {
      userService.getUser('user-id', nowDate);
      const reward = userService.redeemReward('user-id', '2020-03-16T00:00:00Z');

      expect(reward).toEqual({ "error": "This reward is already expired" });
    });
  });
});