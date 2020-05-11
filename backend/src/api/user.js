const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  signInUser,
} = require('../../db/controllers/user_controllers');

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/signup', createUser);
router.post('/signin', signInUser);

module.exports = router;
