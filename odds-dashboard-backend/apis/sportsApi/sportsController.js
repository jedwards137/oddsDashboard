const { eventsGetActiveSports } = require("../../services/eventsService");
const { parseServiceResponse } = require('../common/responseParser');

const getActiveSports = async (req, res) => {
  const activeSports = await eventsGetActiveSports();
  const response = parseServiceResponse(activeSports, res);
  return response;
}

module.exports = { getActiveSports }