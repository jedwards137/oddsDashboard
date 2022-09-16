const Event = require('../models/eventModel');
const mongoose = require('mongoose');
const { DateTime } = require('luxon');

// const eventsGetLive = async () => {
//   const currentDt = DateTime.now();
//   const liveEvents = await Event.find({ 
//     commenceTime: {
//       $lte: currentDt
//     },
//     completed: false || null
//   });
//   return liveEvents;
// }

const eventsCheckForLive = async () => {
  const currentDtAsGmt = DateTime.now().plus({ hours: 4 });
  const foundLiveEvent = await Event.exists({ 
    commenceTime: {
      $lte: currentDtAsGmt
    },
    completed: false || null
  });
  const liveEventsExist = foundLiveEvent !== null ? true : false;
  return liveEventsExist;
}

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

const eventsUpsertByEventId = async (id, propertiesToUpdate) => {
  const updatedEvent = await Event.updateOne(
    { eventId: id }, 
    { ...propertiesToUpdate }, 
    { upsert: true });
  if (!updatedEvent) {
    return null;
  }
  return updatedEvent;
}

const eventsBatchUpsert = async (events) => {
  events.forEach(event => { eventsUpsertByEventId(event.eventId, event) });
}

module.exports = {
  eventsCheckForLive,
  //eventsGetLive,
  eventsGetAll,
  eventsGetById,
  eventsBatchUpsert
}