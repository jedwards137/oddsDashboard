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
      completed: false
    }, 'sportKey')
    .distinct('sportKey');
  return liveSportKeys;
}

const eventsGetTodayBySport = async (requestedSports) => {
  var events = [];
  const startOfToday = DateTime.now().set({ hour: 4, minute: 0, second: 0, millisecond: 0 });
  const startOfTomorrow = startOfToday.plus({ days: 1 });
  for(const sportKey of requestedSports) {
    const eventsForSport = await Event
      .find({ 
        sportKey: sportKey, 
        commenceTime: {
          $gte: startOfToday,
          $lte: startOfTomorrow
        }
      })
      .sort({ commenceTime: 'asc' });
    const eventsForSportObject = {
      sportKey: sportKey,
      events: eventsForSport
    }
    events = events.concat(eventsForSportObject);
  }
  return events;
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
  eventsGetTodayBySport,
  eventsGetById,
  eventsBatchUpsert
}