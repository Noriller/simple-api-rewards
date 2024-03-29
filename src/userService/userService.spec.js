const UserService = require('.');
const database = require('../database');
const {
  nowDate,
  userDataOn19,
  userDataOn26,
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

      expect(user2).toEqual(userDataOn26);
    });

    it('should update the redeemed getting a reward', () => {
      userService.getUser('user-id', nowDate);
      const reward = userService.redeemReward('user-id', nowDate);

      expect(reward).toEqual({ data: redeemedReward });

      const user = userService.getUser('user-id', nowDate);
      expect(user.rewards[nowDateISOString]).toEqual(redeemedReward);
    });
  });

  describe('redeemReward', () => {
    it('should get rewards from user', () => {
      userService.getUser('user-id', nowDate);
      const reward = userService.redeemReward('user-id', nowDate);

      expect(reward).toEqual({ data: redeemedReward });
    });

    it('should return error if reward was already redeemed', () => {
      userService.getUser('user-id', nowDate);
      const reward = userService.redeemReward('user-id', nowDate);

      expect(reward).toEqual({ data: redeemedReward });

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