const { callEndpoint } = require('../common/apiExecutor');

const getMultiSportEventsData = async (sportList, uriFirst, uriSecond, mapper) => {
  var eventsDataList = [];
  for (const sportKey of sportList) {
    const sportUri = uriFirst + sportKey + uriSecond;
    const rawEventsData = await callEndpoint(sportUri);
    const mappedEvents = mapper(rawEventsData);
    eventsDataList.push(...mappedEvents);
  }
  return eventsDataList;
}

module.exports = { getMultiSportEventsData }