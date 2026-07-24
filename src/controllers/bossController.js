const BossBattle = require('../models/BossBattle');
const { generateBossQuestions } = require('../services/groqService');

// Start a new boss battle
const startBattle = async (req, res) => {
  try {
    const { userId } = req.params;
    const { topic } = req.body;

    const questions = await generateBossQuestions(topic, 5);

    const battle = new BossBattle({
      userId,
      topic,
      questions,
      bossHP: 100,
      playerHP: 100,
      status: 'ongoing'
    });

    await battle.save();

    res.status(201).json(battle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit an answer for a question
const submitAnswer = async (req, res) => {
  try {
    const { battleId } = req.params;
    const { questionIndex, selectedAnswer } = req.body;

    const battle = await BossBattle.findById(battleId);
    if (!battle) {
      return res.status(404).json({ message: 'Battle not found' });
    }
    if (battle.status !== 'ongoing') {
      return res.status(400).json({ message: 'Battle already finished' });
    }

    const question = battle.questions[questionIndex];
    if (!question) {
      return res.status(400).json({ message: 'Invalid question index' });
    }

    const isCorrect = question.correctAnswer === selectedAnswer;

    if (isCorrect) {
      battle.bossHP = Math.max(0, battle.bossHP - 20);
    } else {
      battle.playerHP = Math.max(0, battle.playerHP - 20);
    }

    if (battle.bossHP <= 0) {
      battle.status = 'won';
    } else if (battle.playerHP <= 0) {
      battle.status = 'lost';
    }

    await battle.save();

    res.status(200).json({
      isCorrect,
      bossHP: battle.bossHP,
      playerHP: battle.playerHP,
      status: battle.status
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get battle state
const getBattle = async (req, res) => {
  try {
    const { battleId } = req.params;
    const battle = await BossBattle.findById(battleId);
    if (!battle) {
      return res.status(404).json({ message: 'Battle not found' });
    }
    res.status(200).json(battle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { startBattle, submitAnswer, getBattle };