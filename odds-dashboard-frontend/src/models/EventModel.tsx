interface EventModel {
  _id: String;
  eventId: String;
  sportKey: String;
  completed: Boolean;
  commenceTime: String;
  homeTeam: String;
  awayTeam: String;
  odds: {
    bookmakerTitle: String;
    bookmakerKey: String;
    outcomes: [OutcomeModel];
  }
}

export {}