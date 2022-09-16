const Event = require('../models/eventModel');
const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const eventsGetActiveSports = async () => {
  const activeSports = await Event.find({}, 'sportKey sportTitle')
  const distinctSports = [];
  activeSports.forEach(sport => {
    const i = distinctSports.findIndex(x => x.sportKey === sport.sportKey);
    if (i <= -1) {
      distinctSports.push({ sportKey: sport.sportKey, sportTitle: sport.sportTitle });
    }
  })
  return distinctSports;
}

const eventsGetLiveSportKeys = async () => {
  const currentDtAsGmt = DateTime.now().plus({ hours: 4 });
  const liveSportKeys = await Event
    .find({ 
      commenceTime: {
        $lte: currentDtAsGmt
      },
      completed: false || null
    }, 'sportKey')
    .distinct('sportKey');
  return liveSportKeys;
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
  eventsGetActiveSports,
  eventsGetLiveSportKeys,
  eventsGetAll,
  eventsGetById,
  eventsBatchUpsert
}