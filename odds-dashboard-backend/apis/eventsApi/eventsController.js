const { 
  eventsGetAll,
  eventsGetById
} = require('../../services/eventsService');
const { parseServiceResponse } = require('../common/responseParser');

const getAllEvents = async (req, res) => {
  const allEvents = await eventsGetAll();
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
  getAllEvents,
  getEventById
}