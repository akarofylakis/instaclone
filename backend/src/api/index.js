const express = require('express');

const project = require('../constants/project');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: project.message });
});

module.exports = router;
