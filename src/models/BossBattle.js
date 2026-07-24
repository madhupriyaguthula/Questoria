const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], default: [] },
  correctAnswer: { type: String, required: true }
}, { _id: false });

const bossBattleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    default: []
  },
  bossHP: {
    type: Number,
    default: 100
  },
  playerHP: {
    type: Number,
    default: 100
  },
  status: {
    type: String,
    enum: ['ongoing', 'won', 'lost'],
    default: 'ongoing'
  }
}, { timestamps: true });

module.exports = mongoose.model('BossBattle', bossBattleSchema);