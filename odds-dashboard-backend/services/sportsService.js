const { callEndpoint } = require('../common/apiExecutor');

const sportsGetActiveKeys = async () => {
  const activeSports = await callEndpoint(process.env.ACTIVE_SPORTS_URI);
  const activeSportKeys = activeSports.map(sport => sport.key);
  return activeSportKeys;
}

module.exports = { sportsGetActiveKeys }