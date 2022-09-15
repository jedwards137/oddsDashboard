const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sportSchema = new Schema({
  sportKey: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: false
  },
  sportTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    required: true
  },
  hasOutrights: {
    type: Boolean,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Sport', sportSchema);