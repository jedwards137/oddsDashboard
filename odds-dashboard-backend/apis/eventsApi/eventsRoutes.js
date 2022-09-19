const express = require('express');
const { 
  getTodaysEvents,
  getEventById,
} = require('./eventsController');

const router = express.Router();

router.get('/today', getTodaysEvents);
router.get('/:id', getEventById);

module.exports = router;