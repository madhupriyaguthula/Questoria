const World = require('../models/World');

// Get world data for a user
const getWorldData = async (req, res) => {
  try {
    const { userId } = req.params;
    let world = await World.findOne({ userId });

    if (!world) {
      world = new World({ userId });
      await world.save();
    }

    res.status(200).json(world);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add XP and coins (e.g., after completing a quest)
const addRewards = async (req, res) => {
  try {
    const { userId } = req.params;
    const { xp, coins, itemName } = req.body;

    let world = await World.findOne({ userId });
    if (!world) {
      world = new World({ userId });
    }

    world.xp += xp || 0;
    world.coins += coins || 0;

    if (itemName) {
      const existingItem = world.items.find(i => i.itemName === itemName);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        world.items.push({ itemName, quantity: 1 });
      }
    }

    // simple level-up logic: every 100 XP = next level
    world.currentLevel = Math.floor(world.xp / 100) + 1;

    await world.save();
    res.status(200).json(world);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getWorldData, addRewards };