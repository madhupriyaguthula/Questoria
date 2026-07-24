const mongoose = require('mongoose');

const worldSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentLevel: {
    type: Number,
    default: 1
  },
  xp: {
    type: Number,
    default: 0
  },
  coins: {
    type: Number,
    default: 0
  },
  items: [{
    itemName: String,
    quantity: { type: Number, default: 1 }
  }],
  completedQuests: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('World', worldSchema);