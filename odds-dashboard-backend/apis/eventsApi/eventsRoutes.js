const express = require('express');
const { 
  getAllEvents,
  getEventById,
  postEvent,
  deleteEventById,
  patchEventById
} = require('./eventsController');

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', postEvent);
router.delete('/:id', deleteEventById);
router.patch('/:id', patchEventById);

module.exports = router;