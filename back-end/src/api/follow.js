const express = require('express');

const { getUserFollows } = require('../../db/controllers/follow_controllers');

const router = express.Router();

router.get('/:userId/follows', getUserFollows);

module.exports = router;
