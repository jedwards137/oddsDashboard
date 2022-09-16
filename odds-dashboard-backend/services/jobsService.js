const cron = require('node-cron');
const { 
  mapEventsWithScores, 
  mapEventsWithOdds
} = require('../mappers/eventsMapper');
const { getMultiSportEventsData } = require('./dataService');
const { eventsGetLiveSportKeys, eventsBatchUpsert } = require('./eventsService');
const { sportsGetActiveKeys } = require('./sportsService');

const dailyOddsServicingJob = cron.schedule('0 6 * * *', async () => {
  const activeSportKeys = await sportsGetActiveKeys();
  const activeSportsOddsData = await getMultiSportEventsData(
    activeSportKeys,
    process.env.ODDS_URI_FIRST,
    process.env.ODDS_URI_SECOND,
    mapEventsWithOdds);

  eventsBatchUpsert(activeSportsOddsData);
}, {
  scheduled: false
});

const inProgressScoreCheckJob = cron.schedule('* * * * *', async () => {
  const liveSportKeys = await eventsGetLiveSportKeys();
  if (!liveSportKeys || liveSportKeys.length === 0) {
    return;
  }
  const liveSportsScoreData = await getMultiSportEventsData(
    liveSportKeys, 
    process.env.SCORES_URI_FIRST, 
    process.env.SCORES_URI_SECOND, 
    mapEventsWithScores);

  eventsBatchUpsert(liveSportsScoreData);
}, {
  scheduled: false
});

const startJobs = () => {
  dailyOddsServicingJob.start();
  inProgressScoreCheckJob.start();
}

module.exports = { startJobs }