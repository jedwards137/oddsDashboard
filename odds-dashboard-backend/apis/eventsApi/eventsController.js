const { 
  eventsGetTodayBySport,
  eventsGetById
} = require('../../services/eventsService');
const { parseServiceResponse } = require('../common/responseParser');

const getTodaysEvents = async (req, res) => {
  const requestedSports = req.query.sports.split(',');
  const allEvents = await eventsGetTodayBySport(requestedSports);
  console.log(allEvents);
  const response = parseServiceResponse(allEvents, res);
  return response;
}

const getEventById = async (req, res) => {
  const { id } = req.params;
  const eventForId = await eventsGetById(id);
  const response = parseServiceResponse(eventForId, res);
  return response;
}

module.exports = {
  getTodaysEvents,
  getEventById
}