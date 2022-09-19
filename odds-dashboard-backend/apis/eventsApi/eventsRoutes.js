const express = require('express');
const { 
  getTodaysEvents,
  getEventById,
} = require('./eventsController');

const router = express.Router();

router.get('/', getTodaysEvents);
router.get('/:id', getEventById);

module.exports = router;