const { database } = require('../index');
const { getUserRewardsDates } = require('./utils/createRewards');
const { dateToISO } = require("./utils/dateToISO");

function UserService(db = database) {

  function getUser(id, atDate) {
    const rewardsDates = getUserRewardsDates(atDate);
    const userData = {
      id,
      rewards: rewardsDates,
    };

    const user = db.get(id);
    if (!user) {
      db.save(id, userData);
      return userData;
    } else {
      const userRewards = {
        // the newly created comes first
        ...rewardsDates,
        // so they are overwritten if there's already data
        ...user.rewards,
      };

      db.update(id, {
        rewards: userRewards,
      });

      return {
        id,
        rewards: userRewards,
      };
    }
  }

  function redeemReward(id, forDate) {
    const user = db.get(id);

    if (!user) {
      return {
        error: 'User not found',
      };
    }

    const rewards = user.rewards;
    const redeemingReward = rewards[dateToISO(forDate)];

    if (!redeemingReward) {
      return {
        error: 'Reward not found',
      };
    }

    if (redeemingReward.redeemedAt) {
      return {
        error: 'Reward already redeemed',
      };
    }

    if (redeemingReward.expiresAt < dateToISO(new Date())) {
      return {
        error: 'Reward expired',
      };
    }

    db.update(id, {
      rewards: {
        ...rewards,
        [dateToISO(forDate)]: {
          ...redeemingReward,
          redeemedAt: dateToISO(new Date()),
        },
      },
    });

    return {
      message: 'Reward redeemed',
    };
  }

  return {
    getUser,
    redeemReward,
  };
}

module.exports = UserService;