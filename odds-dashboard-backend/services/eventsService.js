const Event = require('../models/eventModel');
const mongoose = require('mongoose');

const eventsGetAll = async () => {
  const allEvents = await Event.find();
  return allEvents;
}

const eventsGetById = async (id) => {
  const isValidMongooseId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidMongooseId) {
    return null;
  }
  const eventForId = await Event.findById(id);
  if (!eventForId) {
    return null;
  }
  return eventForId;
}

const eventsCreate = async (requestBody) => {
  const { eventId, sportKey, sportTitle, commenceTime, completed, homeTeam, awayTeam, scores, eventInfoUpdatedAt, bookmakers } = requestBody;
  try {
    const createdEvent = await Event.create({ eventId, sportKey, sportTitle, commenceTime, completed, homeTeam, awayTeam, scores, eventInfoUpdatedAt, bookmakers });
    return createdEvent;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

const eventsDeleteById = async (id) => {
  const isValidMongooseId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidMongooseId) {
    return null;
  }
  const deletedEvent = await Event.findOneAndDelete({ _id: id });
  if (!deletedEvent) {
    return null;
  }
  return deletedEvent;
}

const eventsPatchById = async (id, requestBody) => {
  const isValidMongooseId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidMongooseId) {
    return null;
  }
  const updatedEvent = await Event.findOneAndReplace({ _id: id }, {
    ...requestBody
  });
  if (!updatedEvent) {
    return null;
  }
  return updatedEvent;
}

module.exports = {
  eventsGetAll,
  eventsGetById,
  eventsCreate,
  eventsDeleteById,
  eventsPatchById
};