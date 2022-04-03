const { database } = require('../index');
const { getUserRewardsDates } = require('./utils/createRewards');
const { dateToISO } = require("./utils/dateToISO");

function UserService(instantiatedDB = database) {
  function getUser(id, date) {
    const rewardsDates = getUserRewardsDates(date);
    const userData = {
      id,
      rewards: rewardsDates,
    };

    if (!instantiatedDB.get(id)) {
      instantiatedDB.set(id, userData);
      return userData;
    } else {
      const user = instantiatedDB.get(id);
      const userRewards = {
        // the newly created comes first
        ...rewardsDates,
        // so they are overwritten if there's already data
        ...user.rewards,
      };

      instantiatedDB.update(id, {
        rewards: userRewards,
      });

      return {
        id,
        rewards: userRewards,
      };
    }
  }

  function redeemReward(id, date) {
    const user = instantiatedDB.get(id);

    if (!user) {
      return {
        error: 'User not found',
      };
    }

    const rewards = user.rewards;
    const reward = rewards[dateToISO(date)];

    if (!reward) {
      return {
        error: 'Reward not found',
      };
    }

    if (reward.redeemedAt) {
      return {
        error: 'Reward already redeemed',
      };
    }

    if (reward.expiresAt < dateToISO(new Date())) {
      return {
        error: 'Reward expired',
      };
    }

    instantiatedDB.update(id, {
      rewards: {
        ...rewards,
        [dateToISO(date)]: {
          ...reward,
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
