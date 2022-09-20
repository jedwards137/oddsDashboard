const mapScores = (rawScores) => {
  let mappedScores = rawScores.map((rawScore) => {
    let mappedScore = {
      name: rawScore.name,
      score: rawScore.score
    };
    return mappedScore;
  });
  return mappedScores;
}

const mapOutcomes = (rawOutcomes) => {
  let mappedOutcomes = rawOutcomes.map((rawOutcome) => {
    let mappedOutcome = {
      name: rawOutcome.name,
      price: rawOutcome.price,
      point: rawOutcome.point
    };
    if (rawOutcome.pointa) {
      mappedOutcome.point = rawOutcome.point;
    }
    return mappedOutcome;
  });
  return mappedOutcomes;
}

const mapMarkets = (rawMarkets) => {
  let mappedMarkets = rawMarkets.map((rawMarket) => {
    let mappedMarket = {
      marketKey: rawMarket.key,
      outcomes: mapOutcomes(rawMarket.outcomes)
    };
    return mappedMarket;
  });
  return mappedMarkets;
}

const mapBookmakers = (rawBookmakers) => {
  let mappedBookmakers = rawBookmakers.map((rawBookmaker) => {
    let mappedBookmaker = {
      bookmakerKey: rawBookmaker.key,
      title: rawBookmaker.title,
      lastUpdate: rawBookmaker.last_update,
      markets: mapMarkets(rawBookmaker.markets)
    };
    return mappedBookmaker;
  });
  return mappedBookmakers;
}

const mapEventsWithOdds = (rawEvents) => {
  let mappedEvents = rawEvents.map((rawEvent) => {
    let mappedEvent = {
      eventId: rawEvent.id,
      sportKey: rawEvent.sport_key,
      sportTitle: rawEvent.sport_title,
      commenceTime: rawEvent.commence_time,
      completed: false,
      homeTeam: rawEvent.home_team,
      awayTeam: rawEvent.away_team,
      bookmakers: mapBookmakers(rawEvent.bookmakers)
    };
    return mappedEvent;
  });
  return mappedEvents;
}

const mapEventsWithScores = (rawEvents) => {
  let mappedEvents = rawEvents
  .filter((rawEvent) => rawEvent.scores !== null)
  .map((rawEvent) => {
    let mappedEvent = {
      eventId: rawEvent.id,
      scores: mapScores(rawEvent.scores),
      completed: rawEvent.completed
    };
    return mappedEvent;
  });
  return mappedEvents;
}

module.exports = { 
  mapEventsWithOdds,
  mapEventsWithScores
}