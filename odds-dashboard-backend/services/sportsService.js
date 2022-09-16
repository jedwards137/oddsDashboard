const { callEndpoint } = require('../common/apiExecutor');

const sportsGetActiveKeys = async () => {
  const acceptedSports = ['americanfootball_ncaaf', 'americanfootball_nfl', 'baseball_mlb'];
  const activeSports = await callEndpoint(process.env.ACTIVE_SPORTS_URI);
  const activeSportKeys = activeSports
    .filter(sport => acceptedSports.includes(sport.key))
    .map(sport => sport.key);
  return activeSportKeys;
}

module.exports = { sportsGetActiveKeys }