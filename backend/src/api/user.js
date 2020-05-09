const express = require('express');

const { getUsers } = require('../../db/controllers/user_controllers');

const router = express.Router();

router.get('/', getUsers);

module.exports = router;
