const cron = require('node-cron');
const { 
  americanFootballOddsUpsert,
  americanFootballScoresUpsert
} = require('./dataService');
const { eventsCheckForLive } = require('./eventsService');

const dailyOddsServicingJob = cron.schedule('0 0 * * *', () => {
  americanFootballOddsUpsert();
}, {
  scheduled: false
});

const inProgressScoreCheckJob = cron.schedule('* * * * *', async () => {
  const liveEventsExist = await eventsCheckForLive();
  if (!liveEventsExist) {
    return;
  }
  americanFootballScoresUpsert();
}, {
  scheduled: false
});

const startJobs = () => {
  dailyOddsServicingJob.start();
  inProgressScoreCheckJob.start();
}

module.exports = { startJobs }