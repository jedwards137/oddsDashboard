const express = require('express');
const { 
  getAllEvents,
  getEventById,
} = require('./eventsController');

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);

module.exports = router;