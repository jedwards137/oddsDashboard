const express = require('express');
const { getActiveSports } = require('./sportsController');

const router = express.Router();

router.get('/active', getActiveSports);

module.exports = router;