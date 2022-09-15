const mongoose = require('mongoose');
//const Bookmaker = require('./bookmakerModel').Schema;

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  }
}, { timestamps: true });

const outcomeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  point: {
    type: Number,
    required: false
  }
}, { timestamps: true });

const marketSchema = new Schema({
  marketKey: {
    type: String,
    required: true
  },
  outcomes: {
    type: [outcomeSchema],
    required: true
  }
}, { timestamps: true });

const bookmakerSchema = new Schema({
  bookmakerKey: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  lastUpdate: {
    type: String,
    required: true
  },
  markets: {
    type: [marketSchema],
    required: true
  }
}, { timestamps: true });

const eventSchema = new Schema({
  eventId: {
    type: String,
    required: true
  },
  sportKey: {
    type: String,
    required: true
  },
  sportTitle: {
    type: String,
    required: true
  },
  commenceTime: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  scores: {
    type: [scoreSchema],
    required: false
  },
  bookmakers: {
    type: [bookmakerSchema],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);