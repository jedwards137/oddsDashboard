const { 
  eventsGetById, 
  eventsCreate, 
  eventsGetAll, 
  eventsDeleteById,
  eventsPatchById
} = require('../../services/eventsService');
const { parseServiceResponse } = require('../common/responseParser');

const getAllEvents = async (req, res) => {
  const allEvents = await eventsGetAll();
  const response = parseServiceResponse(allEvents, res);
  return response;
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  const eventForId = await eventsGetById(id);
  const response = parseServiceResponse(eventForId, res);
  return response;
}

const postEvent = async (req, res) => {
  const createdEvent = await eventsCreate(req.body);
  const response = parseServiceResponse(createdEvent, res);
  return response;
};

const deleteEventById = async (req, res) => {
  const { id } = req.params;
  const deletedEvent = await eventsDeleteById(id);
  const response = parseServiceResponse(deletedEvent, res);
  return response;
};

const patchEventById = async (req, res) => {
  const { id } = req.params;
  const updatedEvent = await eventsPatchById(id, req.body);
  const response = parseServiceResponse(updatedEvent, res);
  return response;
};

module.exports = {
  getAllEvents,
  getEventById,
  postEvent,
  deleteEventById,
  patchEventById
};