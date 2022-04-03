const express = require('express');
const { database } = require('..');
const router = express.Router();
const UserService = require('../userService/');


router.get('/:userId/rewards', (req, res) => {
  const { userId } = req.params;
  const { at } = req.query;

  // I'm choosing to use current date as default
  // this also take care of falsy values that generate a invalid date
  const date = at ? at : new Date();

  // if it is a invalid date, then return an error
  if ((new Date(date)).toString() === 'Invalid Date') {
    return res.status(400).json({ message: 'Invalid date' });
  }

  const userService = UserService(database);
  // this creates or updates the user
  // so, no need to check if there is already an existing user
  const { rewards } = userService.getUser(userId, date);

  return res.status(200).json({ data: rewards });
});

router.patch('/:userId/rewards/:rewardId/redeem', (req, res) => {
  const { userId, rewardId } = req.params;

  const userService = UserService(database);
  // this is a pattern where instead of throwing an error,
  // we just return an error or else
  // the "throwing" are done in the controller (here)
  const { data, error } = userService.redeemReward(userId, rewardId);

  if (error) {
    return res.status(400).json({ error });
  }

  return res.status(200).json({ data });
});

module.exports = router;