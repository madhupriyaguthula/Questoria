const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  happiness: {
    type: Number,
    default: 100
  },
  hunger: {
    type: Number,
    default: 100
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);