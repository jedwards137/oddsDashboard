const { callEndpoint } = require('../common/apiExecutor');
const { 
  mapEventsWithOdds,
  mapEventsWithScores
} = require('../mappers/eventsMapper');
const { eventsBatchUpsert } = require('./eventsService');

const americanFootballOddsUpsert = async () => {
  const rawEvents = await callEndpoint(process.env.ODDS_URI);
  const mappedEvents = mapEventsWithOdds(rawEvents);
  eventsBatchUpsert(mappedEvents);
}

const americanFootballScoresUpsert = async () => {
  const rawScores = await callEndpoint(process.env.SCORES_URI);
  const mappedEvents = mapEventsWithScores(rawScores);
  eventsBatchUpsert(mappedEvents);
}

module.exports = {
  americanFootballOddsUpsert,
  americanFootballScoresUpsert
}