const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  signInUser,
} = require('../../db/controllers/user_controllers');

const {
  followUser,
  unfollowUser,
  acceptFollow,
} = require('../../db/controllers/follow_controllers');

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUser);

router.put('/:userId/accept', acceptFollow);

router.post('/:userId/follow', followUser);
router.post('/signup', createUser);
router.post('/signin', signInUser);

router.delete('/:userId/unfollow', unfollowUser);

module.exports = router;
