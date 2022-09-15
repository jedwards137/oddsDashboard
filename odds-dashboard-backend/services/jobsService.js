const cron = require('node-cron');

const gameInProgressChecker = cron.schedule('*/10 * * * * *', () => {
  console.log('checked progress for games');
}, {
  scheduled: false
});

module.exports = {
  gameInProgressChecker
};