const User = require('../models/User');
const World = require('../models/World');
const BossBattle = require('../models/BossBattle');
const Pet = require('../models/Pet');

// Get full profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const world = await World.findOne({ userId });
    const battles = await BossBattle.find({ userId });
    const pets = await Pet.find({ userId });

    const completedBattles = battles.filter(b => b.status === 'won').length;
    const ongoingBattles = battles.filter(b => b.status === 'ongoing').length;

    res.status(200).json({
      username: user.username,
      email: user.email,
      coins: user.coins,
      xp: user.xp,
      level: world ? world.currentLevel : 1,
      items: world ? world.items : [],
      completedQuests: world ? world.completedQuests : [],
      achievements: {
        battlesWon: completedBattles,
        battlesOngoing: ongoingBattles,
        petsOwned: pets.length
      },
      pets
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update username
const updateUsername = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUsername } = req.body;

    const existing = await User.findOne({ username: newUsername });
    if (existing) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { username: newUsername },
      { new: true }
    ).select('-password');

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProfile, updateUsername };